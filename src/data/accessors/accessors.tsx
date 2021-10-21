import {
  addDoc,
  deleteDoc,
  deleteField,
  doc,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "@firebase/firestore";
import type { User as FirebaseUser } from "@firebase/auth";

import { getApp } from "firebase/app";

import {
  Team,
  teamConverter,
  TeamMember,
  teamMemberConverter,
  User,
  userConverter,
} from "../models";
import axios from "axios";

export async function getTeamDoc(
  teamId: string
): Promise<QueryDocumentSnapshot<Team>> {
  const db = getFirestore(getApp());
  const teamDocs = await getDocs(
    query(collection(db, "teams"), where("teamId", "==", teamId)).withConverter(
      teamConverter
    )
  );
  if (teamDocs.empty) throw new TeamNotExistsError();

  return teamDocs.docs[0];
}

export async function getTeamWithMembers(teamId: string): Promise<Team> {
  const teamDoc = await getTeamDoc(teamId);
  const teamMembers = await getTeamMembersDoc(teamDoc.id).then((tmds) =>
    tmds.map((tmd) => tmd.data())
  );
  return {
    ...teamDoc.data(),
    teamMembers,
  };
}

export async function teamExists(teamId: string): Promise<boolean> {
  const db = getFirestore(getApp());
  const teamDocs = await getDocs(
    query(collection(db, "teams"), where("teamId", "==", teamId)).withConverter(
      teamConverter
    )
  );
  return !teamDocs.empty;
}

export async function getTeamMembersDoc(
  teamDocId: string
): Promise<QueryDocumentSnapshot<TeamMember>[]> {
  const db = getFirestore(getApp());
  const teamDocs = await getDocs(
    query(collection(db, "teams", teamDocId, "teamMembers")).withConverter(
      teamMemberConverter
    )
  );
  return teamDocs.docs;
}

export async function getUserDoc(
  email: string
): Promise<QueryDocumentSnapshot<User>> {
  const db = getFirestore(getApp());
  const userDocs = await getDocs(
    query(collection(db, "users"), where("email", "==", email)).withConverter(
      userConverter
    )
  );
  if (userDocs.empty) throw new UserNotExistsError();

  return userDocs.docs[0];
}

export async function createTeam(
  user: FirebaseUser,
  teamName: string
): Promise<Team> {
  const db = getFirestore(getApp());
  const userDoc = await getUserDoc(user.email as string);
  const teamNameTaken = await getDocs(
    query(
      collection(db, "teams").withConverter(teamConverter),
      where("teamName", "==", teamName)
    )
  ).then((qs) => !qs.empty);

  if (teamNameTaken) throw new TeamNameTakenError();

  const teamId = await axios
    .post<string>(
      `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/team/${process.env.REACT_APP_DISCORD_BOT_SERVER}`,
      {
        name: teamName,
      },
      {
        headers: {
          Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
        },
      }
    )
    .then((data) => data.data.replace("token", ""));

  await axios.put(
    `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
      process.env.REACT_APP_DISCORD_BOT_SERVER
    }/${userDoc.data().discordId}/${teamId}`,
    {},
    {
      headers: {
        Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
      },
    }
  );

  const newTeamDoc = await addDoc(collection(db, "teams"), {
    teamName: teamName,
    teamId: teamId,
  });
  await addDoc(collection(db, "teams", newTeamDoc.id, "teamMembers"), {
    name: user.displayName,
    email: user.email,
  });

  await setDoc(
    doc(db, "users", userDoc.id),
    {
      teamId: teamId,
    },
    { merge: true }
  );

  return {
    teamId,
    teamName,
    teamMembers: [
      {
        name: user.displayName as string,
        email: user.email as string,
      },
    ],
  };
}

export async function joinUserToTeam(
  user: FirebaseUser,
  teamId: string
): Promise<void> {
  const db = getFirestore(getApp());
  const teamDocId = await getTeamDoc(teamId).then((td) => td.id);
  const userDoc = await getUserDoc(user.email as string);

  const countMembersInTeam = await getDocs(
    collection(db, "teams", teamDocId, "teamMembers")
  ).then((tmds) => tmds.size);

  if (countMembersInTeam >= 6) {
    throw new TeamFullError();
  }

  await axios.put(
    `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
      process.env.REACT_APP_DISCORD_BOT_SERVER
    }/${userDoc.data().discordId}/${teamId}`,
    {},
    {
      headers: {
        Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
      },
    }
  );

  await addDoc(collection(db, "teams", teamDocId, "teamMembers"), {
    email: user.email as string,
    name: user.displayName as string,
  });
  await setDoc(
    doc(
      db,
      "users",
      await getUserDoc(user.email as string).then((ud) => ud.id)
    ),
    {
      teamId,
    },
    {
      merge: true,
    }
  );
}

export async function removeUserFromTeam(user: FirebaseUser): Promise<void> {
  const db = getFirestore(getApp());
  const userDoc = await getUserDoc(user.email as string);
  const teamId = userDoc.data().teamId;

  // User dosen't have a teamId
  if (teamId === undefined) return;

  const teamDocId = await getTeamDoc(teamId).then((td) => td.id);

  await updateDoc(doc(db, "users", userDoc.id), {
    teamId: deleteField(),
  });

  const teamSize = await getDocs(
    collection(db, "teams", teamDocId, "teamMembers")
  ).then((tmds) => tmds.size);

  const userTeamMemberDocs = await getDocs(
    query(
      collection(db, "teams", teamDocId, "teamMembers").withConverter(
        teamMemberConverter
      ),
      where("email", "==", user.email)
    )
  );

  // User not in the list of members
  if (userTeamMemberDocs.empty) return;

  await deleteDoc(
    doc(db, "teams", teamDocId, "teamMembers", userTeamMemberDocs.docs[0].id)
  );

  // Remove user from team
  await axios.delete(
    `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
      process.env.REACT_APP_DISCORD_BOT_SERVER
    }/${userDoc.data().discordId}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
      },
    }
  );

  if (teamSize === 1) {
    await deleteDoc(doc(db, "teams", teamDocId));
    // Delete team
    await axios.delete(
      `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/team/${process.env.REACT_APP_DISCORD_BOT_SERVER}/${teamId}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
        },
      }
    );
  }
}

export class UserNotExistsError extends Error {}
export class TeamNotExistsError extends Error {}
export class TeamFullError extends Error {}
export class TeamNameTakenError extends Error {}
