import Header from "src/components/landing/Header";
import Launch from "src/components/landing/Hero";
import About from "src/components/landing/About";
import FAQ from "src/components/landing/FAQ";
import Sponsors from "src/components/landing/Sponsors";
import Footer from "src/components/landing/Footer";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";

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
      <Launch />
      <About />
      <FAQ />
      <Sponsors />
      <Footer />
    </Box>
  );
}
