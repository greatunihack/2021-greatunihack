import type {
  FirestoreDataConverter,
  SnapshotOptions,
  DocumentData,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import { TeamMember } from "./TeamMember";

export type Team = {
  teamId: string;
  teamName: string;
  teamMembers: TeamMember[];
};

export const teamConverter: FirestoreDataConverter<Team> = {
  toFirestore(team: Team): DocumentData {
    return team;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Team>,
    options: SnapshotOptions
  ): Team {
    return snapshot.data(options);
  },
};
