import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "src/pages/dashboard";
import Profile from "src/pages/discord";
import Contact from "src/pages/contact";
import Sponsors from "src/pages/sponsors";
import Challenges from "src/pages/challenges";
import Team from "src/pages/team";
import Error from "src/pages/error";
import Twitch from "src/pages/twitch";
import { useContext, useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  where,
  getFirestore,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthContext";
import { getApp } from "firebase/app";

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const app = getApp();
  const db = getFirestore(app);

  const [earlyRestrict] = useState(() => {
    const currentTime = new Date();
    const hackathonTime = Date.parse(`${process.env.REACT_APP_HACKATHON_DATE}`);
    if (currentTime.getTime() < hackathonTime) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (user && typeof user !== "string")
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((userDocs) => {
        if (userDocs.docs[0].data().rejected) {
          console.log(userDocs.docs[0].data());
          setUser("rejected");
        } else if (!userDocs.docs[0].data().accepted) {
          setUser("notaccepted");
        }
      });
  });
  if (user === "rejected" || user === "notaccepted") {
    <Redirect to="/dashboard/home" />;
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard/home">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard">
          <Redirect to="/dashboard/home" />
        </Route>
        <Route exact path="/dashboard/404">
          <Error code={404} message="Page Not Found" />
        </Route>
        {user !== "rejected" && user !== "notaccepted" ? (
          <>
            <Route exact path="/dashboard/discord">
              <Profile />
            </Route>
            <Route exact path="/dashboard/sponsors">
              <Sponsors />
            </Route>
            <Route exact path="/dashboard/contact">
              <Contact />
            </Route>
            {earlyRestrict ? (
              <Route
                exact
                path="/dashboard/challenges"
                component={() => {
                  window.location.href =
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                  return null;
                }}
              />
            ) : (
              <Route exact path="/dashboard/challenges">
                <Challenges />
              </Route>
            )}
            <Route exact path="/dashboard/twitch">
              <Twitch />
            </Route>
            <Route exact path="/dashboard/team">
              <Team />
            </Route>
          </>
        ) : null}
        <Route exact path="/dashboard/*">
          <Redirect to="/dashboard/404" />
        </Route>
      </Switch>
    </Router>
  );
}
