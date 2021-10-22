import type {
  FirestoreDataConverter,
  SnapshotOptions,
  DocumentData,
  QueryDocumentSnapshot,
} from "@firebase/firestore";

export type TeamMember = {
  email: string;
  name: string;
};

export const teamMemberConverter: FirestoreDataConverter<TeamMember> = {
  toFirestore(teamMember: TeamMember): DocumentData {
    return teamMember;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<TeamMember>,
    options: SnapshotOptions
  ): TeamMember {
    return snapshot.data(options);
  },
};
