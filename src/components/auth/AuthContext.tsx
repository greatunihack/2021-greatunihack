import React from "react";
// eslint-disable-next-line import/named
import { User } from "firebase/auth";

export const AuthContext = React.createContext<User | null>(null);
