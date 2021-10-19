import {
  AppBar,
  makeStyles,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Copyright } from "src/components/copyright";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    alignItems: "center",
  },
  icons: {
    padding: "2px",
    fontSize: "1.4em",
    color: "black",
  },
  boxes: {
    margin: "1px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Box className={classes.boxes}>
        <IconButton>
          <FacebookIcon
            className={classes.icons}
            onClick={() =>
              (window.location.href = "https://www.facebook.com/unicsmcr/")
            }
          />
        </IconButton>
        <IconButton>
          <InstagramIcon
            className={classes.icons}
            onClick={() =>
              (window.location.href = "https://www.instagram.com/unicsmcr/")
            }
          />
        </IconButton>
      </Box>
      <Box className={classes.boxes} pb={2}>
        <Typography>Contact: hackathons@unicsmcr.com</Typography>
      </Box>
      <Box className={classes.boxes}>
        <Copyright />
      </Box>
    </AppBar>
  );
}
