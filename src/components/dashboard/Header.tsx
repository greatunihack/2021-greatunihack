import { AppBar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Typography variant="body2">
          {process.env.REACT_APP_HACKATHON_NAME}
        </Typography>
      </AppBar>
    </>
  );
}
