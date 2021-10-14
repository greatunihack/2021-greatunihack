import { Dispatch } from "react";
import type { UseFormSetError } from "react-hook-form";

import Filter from "bad-words";
import { v4 } from "uuid";

import {
  addDoc,
  doc,
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  updateDoc,
  deleteField,
  deleteDoc,
} from "@firebase/firestore";
import type { User } from "@firebase/auth";
import { getApp } from "@firebase/app";

import {
  User as InternalUser,
  userConverter,
  Team,
  teamConverter,
  TeamMember,
  teamMemberConverter,
} from "src/data/models";
import {
  TeamDispatchActions,
  TeamActions,
  TeamDispatchActionType,
  JoinTeamInputs,
  CreateTeamInputs,
} from "./types";

export function getActions(
  dispatch: Dispatch<TeamDispatchActions>
): TeamActions {
  const app = getApp();
  const db = getFirestore(app);

  const loadCurrentTeam = (user: User) => {
    getDocs(
      query(
        collection(db, "users").withConverter<InternalUser>(userConverter),
        where("email", "==", user.email)
      )
    ).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        const user = document.data();

        if (!user.teamId) return;

        if (!user.discordAccessToken) {
          dispatch({ type: TeamDispatchActionType.SetDiscordNotLinked });
          return;
        }

        getDocs(
          query(
            collection(db, "teams").withConverter<Team>(teamConverter),
            where("teamId", "==", document.data().teamId)
          )
        ).then((querySnapshot) => {
          querySnapshot.forEach((document) => {
            const teamData = document.data();

            getDocs(
              collection(
                db,
                "teams",
                document.id,
                "teamMembers"
              ).withConverter<TeamMember>(teamMemberConverter)
            ).then((querySnapshot) => {
              const currentTeamMembers: TeamMember[] = [];
              querySnapshot.forEach((document) => {
                currentTeamMembers.push(document.data());
              });
              dispatch({
                type: TeamDispatchActionType.Load,
                payload: {
                  team: {
                    ...teamData,
                    teamMembers: currentTeamMembers,
                  },
                },
              });
            });
          });
        });
      });
    });
  };

  const deleteCurrentTeam = (user: User) => {
    getDocs(
      query(
        collection(db, "users"),
        where("email", "==", user.email)
      ).withConverter(userConverter)
    ).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        const user = document.data();
        if (user.teamId) {
          // Delete teamId from user document
          updateDoc(doc(db, "users", document.id), {
            teamId: deleteField(),
          });

          getDocs(
            query(
              collection(db, "teams").withConverter(teamConverter),
              where("teamId", "==", document.data().teamId)
            )
          ).then((querySnapshot) => {
            querySnapshot.forEach((team_document) => {
              getDocs(
                collection(
                  db,
                  "teams",
                  team_document.id,
                  "teamMembers"
                ).withConverter(teamMemberConverter)
              ).then((querySnapshot) => {
                // If this was the last user on the team, delte the team

                console.log(`Members in team: ${querySnapshot.size}`);

                if (querySnapshot.size === 1) {
                  console.log("deleting document");
                  deleteDoc(doc(db, "teams", team_document.id));
                } else {
                  // Otherwise just remove this users from member
                  querySnapshot.forEach((user_document) => {
                    const teamMember = user_document.data();
                    if (user.email === teamMember.email) {
                      deleteDoc(
                        doc(
                          db,
                          "teams",
                          team_document.id,
                          "teamMembers",
                          user_document.id
                        )
                      );
                    }
                  });
                }

                showSuccessMessage("Left team successfully!");
                dispatch({ type: TeamDispatchActionType.Delete });
              });
            });
          });
        }
      });
    });
  };

  const joinTeam = (
    user: User,
    teamId: string,
    setErrors: UseFormSetError<JoinTeamInputs>
  ) => {
    getDocs(
      query(
        collection(db, "teams"),
        where("teamId", "==", teamId)
      ).withConverter(teamConverter)
    ).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("Got here!");
        setErrors(
          "teamId",
          {
            message: "Team not found!",
          },
          {
            shouldFocus: true,
          }
        );
        return;
      }

      querySnapshot.forEach((team_document) => {
        const team = team_document.data();

        getDocs(
          collection(
            db,
            "teams",
            team_document.id,
            "teamMembers"
          ).withConverter(teamMemberConverter)
        ).then((querySnapshot) => {
          if (querySnapshot.size >= 6) {
            setErrors("teamId", {
              message: "You can't have more than 6 people on the same team!",
            });
            return;
          }

          // Gather all current team members, add user and dispatch
          const currentTeamMembers: TeamMember[] = [];
          querySnapshot.forEach((document) => {
            currentTeamMembers.push(document.data());
          });
          dispatch({
            type: TeamDispatchActionType.Load,
            payload: {
              team: {
                ...team,
                teamMembers: [
                  ...currentTeamMembers,
                  {
                    email: user.email as string,
                    name: user.displayName as string,
                  },
                ],
              },
            },
          });
          closeJoinTeamDialog();
          showSuccessMessage("Team joined successfully!");

          addDoc(collection(db, "teams", team_document.id, "teamMembers"), {
            name: user.displayName,
            email: user.email,
          });

          // Updating the user
          getDocs(
            query(
              collection(db, "users"),
              where("email", "==", user.email)
            ).withConverter(userConverter)
          ).then((querySnapshot) => {
            querySnapshot.forEach((document) => {
              setDoc(
                doc(db, "users", document.id),
                {
                  teamId: teamId,
                },
                { merge: true }
              );
            });
          });
        });
      });
    });
  };

  const createTeam = (
    user: User,
    teamName: string,
    setError: UseFormSetError<CreateTeamInputs>
  ) => {
    const teamId = v4();
    if (new Filter().isProfane(teamName)) {
      setError(
        "teamName",
        {
          message: "Team name is not allowed",
        },
        {
          shouldFocus: true,
        }
      );
      return;
    }

    getDocs(
      query(
        collection(db, "teams").withConverter<Team>(teamConverter),
        where("teamName", "==", teamName)
      )
    ).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        setError(
          "teamName",
          {
            message: "Team name is taken",
          },
          {
            shouldFocus: true,
          }
        );
        return;
      }

      // Create Team
      addDoc(collection(db, "teams"), {
        teamName: teamName,
        teamId: teamId,
      }).then((docRef) => {
        addDoc(collection(db, "teams", docRef.id, "teamMembers"), {
          name: user.displayName,
          email: user.email,
        });
      });

      // Assign User to team
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          setDoc(
            doc(db, "users", document.id),
            {
              teamId: teamId,
            },
            { merge: true }
          );
        });
      });

      closeCreateTeamDialog();
      showSuccessMessage(
        `Team created successfully! Your team ID is: ${teamId}`
      );
      dispatch({
        type: TeamDispatchActionType.Load,
        payload: {
          team: {
            teamId,
            teamName,
            teamMembers: [
              {
                name: user.displayName as string,
                email: user.email as string,
              },
            ],
          },
        },
      });
    });
  };

  const showMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "primary" },
    });
  };

  const showSuccessMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "success" },
    });
  };

  const showErrorMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "error" },
    });
  };

  const closeMessageDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseMessageDialog });
  };

  const showJoinTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.ShowJoinTeamDialog });
  };

  const closeJoinTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseJoinTeamDialog });
  };

  const showCreateTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.ShowCreateTeamDialog });
  };

  const closeCreateTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseCreateTeamDialog });
  };

  return {
    loadCurrentTeam,
    deleteCurrentTeam,
    joinTeam,
    createTeam,
    showMessage,
    showSuccessMessage,
    showErrorMessage,
    closeMessageDialog,
    showJoinTeamDialog,
    closeJoinTeamDialog,
    showCreateTeamDialog,
    closeCreateTeamDialog,
  };
}
