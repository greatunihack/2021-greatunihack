/* eslint-disable import/named */
import { useEffect, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  User,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence);

interface Props {
  children?: React.ReactElement;
}

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
