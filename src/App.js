import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "src/components/theme/index";

import Landing from "src/pages/landing";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
