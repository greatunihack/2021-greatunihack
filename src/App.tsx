import React, { useContext, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "src/components/theme/index";
import Landing from "src/pages/landing";
import DashboardLayout from "src/components/dashboard-layout";
import Apply from "src/pages/apply";
import Login from "src/pages/login";
import Error from "src/pages/error";
import { AuthContext } from "src/components/auth/AuthContext";
import { Loading } from "src/components/loading";
import Legal from "src/pages/legal";

export default function App() {
  const { user } = useContext(AuthContext);
  const [earlyRestrict] = useState(() => {
    const currentTime = new Date();
    const hackathonTime = Date.parse(`${process.env.REACT_APP_APPLY_DATE}`);
    if (currentTime.getTime() < hackathonTime) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/404">
            <Error code={404} message="Page Not Found" />
          </Route>
          <Route exact path="/legal">
            <Legal />
          </Route>
          <Route exact path="/login">
            {user == "loading" ? (
              <Loading />
            ) : user ? (
              <Redirect to="/dashboard/home" />
            ) : (
              <Login />
            )}
          </Route>
          {earlyRestrict ? (
            <Route exact path="/apply">
              <Apply />
            </Route>
          ) : null}
          <Route path="/dashboard">
            {user == "loading" ? (
              <Loading />
            ) : user ? (
              <DashboardLayout />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
