import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    padding: "10px",
  },

  title: {
    flewGrow: 1,
    marginLeft: "10px",
    fontSize: "23px",
  },
  icons: {
    padding: "4px",
    cursor: "pointer",
    position: "relative",
    top: "6px",
  },
  btns: {
    fontSize: "14px",
  },

  toolbar: theme.mixins.toolbar,
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <AppBar className={classes.nav}>
          <Toolbar>
            <Grid justifyContent="space-between" container spacing={10}>
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  &#60;GreatUniHack2021/&#62;
                </Typography>
              </Grid>

              <Grid item>
                <div>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    className={classes.btns}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    href="#about"
                    className={classes.btns}
                  >
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
                  <FacebookIcon
                    className={classes.icons}
                    onClick={() =>
                      (window.location.href =
                        "https://www.facebook.com/unicsmcr/")
                    }
                  />
                  <InstagramIcon
                    className={classes.icons}
                    onClick={() =>
                      (window.location.href =
                        "https://www.instagram.com/unicsmcr/")
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
