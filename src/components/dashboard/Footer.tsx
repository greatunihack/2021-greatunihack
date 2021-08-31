import { AppBar, Link, Typography, makeStyles, Grid } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  icons: {
    padding: "3px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="body2">
            {"Copyright © "}
            <Link color="inherit" href="https://unicsmcr.com/">
              UniCS
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Grid>

        <Grid item>
          <div>
            <InstagramIcon
              className={classes.icons}
              onClick={(event) =>
                (window.location.href = "https://www.instagram.com/unicsmcr/")
              }
            />
            <FacebookIcon
              className={classes.icons}
              onClick={(event) =>
                (window.location.href = "https://www.facebook.com/")
              }
            />
          </div>
        </Grid>
      </Grid>
    </AppBar>
  );
}
