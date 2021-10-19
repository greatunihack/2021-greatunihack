import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SponsorSection from "src/pages/sponsors/SponsorSection";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: "#272727",
    color: "#fafdf6",
    padding: "30px",
  },
  title: {
    // borderBottomStyle: "solid",
    paddingBottom: "5px",
  },
  container: {
    marginTop: "20px",
  },
}));

export default function Sponsors() {
  const classes = useStyle();
  return (
    <div id="sponsors" className={classes.root}>
      <Typography variant="h4" align="center">
        <a className={classes.title}>Meet our Sponsors</a>
      </Typography>
      <Grid container className={classes.container}>
        <SponsorSection />
      </Grid>
    </div>
  );
}
