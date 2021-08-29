import {
  AppBar,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";

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
      <Typography variant="body2">
        {"Copyright © "}
        <Link color="inherit" href="https://unicsmcr.com/">
          UniCS
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </AppBar>
  );
}
