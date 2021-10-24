/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import type { User } from "@firebase/auth";

export const AuthContext = React.createContext<{
  user: User | null | string;
  setUser: React.Dispatch<React.SetStateAction<User | null | string>>;
}>({
  user: null,
  setUser: () => {},
});
