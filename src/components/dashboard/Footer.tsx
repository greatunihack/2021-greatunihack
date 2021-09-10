import { AppBar, makeStyles } from "@material-ui/core";
import { Copyright } from "src/components/copyright";
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Copyright variant="body2" />
    </AppBar>
  );
}
