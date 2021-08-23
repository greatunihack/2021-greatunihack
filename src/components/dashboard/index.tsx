import { Box, makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Submissions from "src/pages/submissions";
import Home from "src/pages/home";
import Profile from "src/pages/profile";
import Contact from "src/pages/contact";
import Sponsors from "src/pages/sponsors";
import Challenges from "src/pages/challenges";
import Footer from "src/components/dashboard/Footer";
import Header from "src/components/dashboard/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Router>
        <Header />
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
        </Switch>
        <Footer />
      </Router>
    </Box>
  );
}
