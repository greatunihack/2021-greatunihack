import {
  Button,
  Grid,
  Toolbar,
  Container,
  Box,
  AppBar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flewGrow: 1,
  },

  toolbar: theme.mixins.toolbar,
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              &#60;GreatUniHack2021/&#62;
            </Typography>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/dashboard/home">
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
