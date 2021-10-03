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
    padding: "5px",
    fontSize: "1.7em",
    color: "white",
  },
  boxes: {
    margin: "2px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Box className={classes.boxes}>
        <IconButton>
          <InstagramIcon
            className={classes.icons}
            onClick={() =>
              (window.location.href = "https://www.instagram.com/unicsmcr/")
            }
          />
        </IconButton>
        <IconButton>
          <FacebookIcon
            className={classes.icons}
            onClick={() => (window.location.href = "https://www.facebook.com/")}
          />
        </IconButton>
      </Box>
      <Box className={classes.boxes}>
        <Typography>hackathons@unicsmcr.com</Typography>
      </Box>
      <Box className={classes.boxes}>
        <Copyright />
      </Box>
    </AppBar>
  );
}
