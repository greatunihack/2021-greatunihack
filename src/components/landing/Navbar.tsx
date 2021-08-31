import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flewGrow: 1,
  },

  toolbar: theme.mixins.toolbar,
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          &#60;GreatUniHack2021/&#62;
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">FAQ</Button>
        <Button color="inherit">Sponsors</Button>
        <Button color="inherit">Contact us</Button>
      </Toolbar>
    </AppBar>
  );
}
