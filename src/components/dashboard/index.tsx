import { Box, makeStyles, CssBaseline } from "@material-ui/core";
// import Footer from "src/components/dashboard/Footer";
import Header from "src/components/dashboard/Header";
import Routes from "src/components/dashboard/Routes";

const useStyles = makeStyles((theme) => ({
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
      {/* <Footer /> */}
    </Box>
  );
}
