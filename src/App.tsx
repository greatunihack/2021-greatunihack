/* eslint-disable import/named */
import React, { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "src/components/theme/index";
import Landing from "src/pages/landing";
import Dashboard from "src/components/dashboard";
import Apply from "src/pages/apply";
import Login from "src/pages/login";
import Error from "src/pages/error";
import { AuthContext } from "src/components/auth/AuthContext";
import { Loading } from "src/components/loading";

export default function App() {
  const { user } = useContext(AuthContext);

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
          <Route exact path="/login">
            {user == "loading" ? (
              <Loading />
            ) : user ? (
              <Redirect to="/dashboard/home" />
            ) : (
              <Login />
            )}
          </Route>
          <Route exact path="/apply">
            <Apply />
          </Route>
          <Route
            exact
            path="/discord"
            component={() => {
              window.location.href = "https://discord.com";
              return null;
            }}
          />
          <Route path="/dashboard">
            {user == "loading" ? (
              <Loading />
            ) : user ? (
              <Dashboard />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="*">
            <Error code={404} message="Page Not Found" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
