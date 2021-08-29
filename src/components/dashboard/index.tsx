import { Typography } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import Submissions from 'src/pages/submissions';
import Home from 'src/pages/home';
import Profile from 'src/pages/profile';
import Contact from 'src/pages/contact';
import Sponsors from 'src/pages/sponsors';
import Challenges from 'src/pages/challenges';

export default function Landing() {
  return (
    <>
      <Typography>Header</Typography>
      <Switch>
        <Route exact path="/dashboard">
          <Redirect push to="/dashboard/home" />
        </Route>
        <Route exact path="/dashboard/home">
          <Home />
        </Route>
        <Route exact path="/dashboard/profile">
          <Profile />
        </Route>
        <Route exact path="/dashboard/submissions">
          <Submissions />
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
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      <Typography>Footer</Typography>
    </>
  );
}
