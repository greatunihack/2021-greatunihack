/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { User } from "firebase/auth";

export const AuthContext = React.createContext<{
  user: User | null | "loading";
  setUser: React.Dispatch<React.SetStateAction<User | null | "loading">>;
}>({
  user: null,
  setUser: () => {},
});
