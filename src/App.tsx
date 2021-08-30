import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "src/components/theme/index";
import Landing from "src/pages/landing";
import Dashboard from "src/components/dashboard";
import Apply from "src/pages/apply";
import Login from "src/pages/login";
import Error from "src/pages/error";

export default function App() {
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
            <Login />
          </Route>
          <Route exact path="/apply">
            <Apply />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="*">
            <Error code={404} message="Page Not Found" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
