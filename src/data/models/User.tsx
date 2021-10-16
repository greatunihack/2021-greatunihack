import type {
  FirestoreDataConverter,
  SnapshotOptions,
  DocumentData,
  QueryDocumentSnapshot,
} from "@firebase/firestore";

export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  ethnicity?: string;
  teamId?: string;
  cvUrl?: string;
  discordAccessToken?: string;
  discordRefreshToken?: string;
  discordId?: string;
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return user;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<User>,
    options: SnapshotOptions
  ): User {
    return snapshot.data(options);
  },
};
