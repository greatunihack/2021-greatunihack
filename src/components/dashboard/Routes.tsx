import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "src/pages/home";
import Profile from "src/pages/profile";
import Contact from "src/pages/contact";
import Sponsors from "src/pages/sponsors";
import Challenges from "src/pages/challenges";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard/home">
          <Home />
        </Route>
        <Route exact path="/dashboard/profile">
          <Profile />
        </Route>
        <Route exact path="/dashboard/sponsors">
          <Sponsors />
        </Route>
        <Route exact path="/dashboard/contact">
          <Contact />
        </Route>
        <Route exact path="/dashboard/challenges">
          <Challenges />
        </Route>
        <Route path="/dashboard">
          <Redirect push to="/dashboard/home" />
        </Route>
      </Switch>
    </Router>
  );
}
