import {
  AppBar,
  Typography,
  makeStyles,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1, 2),
  },
  title: {
    fontSize: "1.5em",
    fontWeight: 400,
    flex: 1,
  },
  icon: {
    fill: "white",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch();
  }

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Typography className={classes.title}>
          &#60;{process.env.REACT_APP_HACKATHON_NAME} /&#62;
        </Typography>
        <IconButton onClick={logOut}>
          <ExitToAppIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
