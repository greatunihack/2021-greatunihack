import { Box, makeStyles, CssBaseline } from "@material-ui/core";
import Header from "src/components/dashboard/Header";
import Routes from "src/components/dashboard/Routes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Header />
      <Routes />
    </Box>
  );
}
