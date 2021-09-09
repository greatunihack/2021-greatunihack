import { useEffect, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import { initializeApp } from "firebase/app";
// eslint-disable-next-line import/named
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDiAu-TMx91OZd3yRuwThXJN0srD2dbaQ4",
  authDomain: "greatunihack21.firebaseapp.com",
  projectId: "greatunihack21",
  storageBucket: "greatunihack21.appspot.com",
  messagingSenderId: "393678004919",
  appId: "1:393678004919:web:8bbb46c9751adc9e90e332",
});
const auth = getAuth(firebaseApp);

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
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
