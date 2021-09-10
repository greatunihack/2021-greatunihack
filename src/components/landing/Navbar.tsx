import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btns: {
    fontSize: "14px",
  },
  header: {
    padding: theme.spacing(1, 2),
  },
  title: {
    fontSize: "1.5em",
    fontWeight: 400,
    flex: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Typography className={classes.title}>
          &#60;{process.env.REACT_APP_HACKATHON_NAME} /&#62;
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          className={classes.btns}
        >
          Home
        </Button>
        <Button color="inherit" href="#about" className={classes.btns}>
          About Us
        </Button>
        <Button color="inherit" href="#faq" className={classes.btns}>
          FAQ
        </Button>
        <Button color="inherit" className={classes.btns}>
          Last Year
        </Button>
        <Button color="inherit" className={classes.btns}>
          Sponsors
        </Button>
        <IconButton
          onClick={() =>
            (window.location.href = "https://www.facebook.com/unicsmcr/")
          }
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            (window.location.href = "https://www.instagram.com/unicsmcr/")
          }
        >
          <InstagramIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
