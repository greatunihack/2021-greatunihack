/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
import { useEffect, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  User,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const storage = getStorage(firebaseApp);

if (process.env.REACT_APP_FIREBASE_APP_CHECK_PUBLIC_KEY) {
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(
      process.env.REACT_APP_FIREBASE_APP_CHECK_PUBLIC_KEY
    ),
    isTokenAutoRefreshEnabled: true,
  });
}

const auth = getAuth(firebaseApp);

export function setUserPersistence(persist: boolean) {
  if (persist) {
    setPersistence(auth, browserLocalPersistence);
  } else {
    setPersistence(auth, browserSessionPersistence);
  }
}

interface Props {
  children?: React.ReactElement;
}

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<User | null | string>("loading");

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
