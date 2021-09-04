import { AppBar, makeStyles, Box } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
  },
  container: {
    justifyContent: "center",
  },
  icons: {
    padding: "3px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.footer}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <InstagramIcon
            className={classes.icons}
            onClick={() =>
              (window.location.href = "https://www.instagram.com/unicsmcr/")
            }
          />
          <FacebookIcon
            className={classes.icons}
            onClick={() => (window.location.href = "https://www.facebook.com/")}
          />
        </Box>
      </AppBar>
    </div>
  );
}
