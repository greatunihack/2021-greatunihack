import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              &#60;GreatUniHack2021/&#62;
            </Typography>
          </Grid>

          <Grid item>
            <div>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">FAQ</Button>
              <Button color="inherit" component={Link} to="/dashboard/sponsors">
                Sponsors
              </Button>
              <Button color="inherit">Contact us</Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
