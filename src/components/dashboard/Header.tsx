import { AppBar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(3, 2),
  },
  title: {
    fontSize: "1.5em",
    fontWeight: 400,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Typography className={classes.title}>
          {process.env.REACT_APP_HACKATHON_NAME}
        </Typography>
      </AppBar>
    </>
  );
}
