import { Grid, Typography } from "@material-ui/core";
import SponsorCategory from "src/pages/sponsors/SponsorCategory";
import sponsors from "src/data/SponsorData.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: "#a59132",
    color: "#fafdf6",
    padding: "30px",
  },
  title: {
    borderBottomStyle: "solid",
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
        <SponsorCategory
          category="Gold"
          colour="#AF9500"
          sponsors={sponsors.gold}
        />
        <SponsorCategory
          category="Silver"
          colour="#B4B4B4"
          sponsors={sponsors.silver}
        />
        <SponsorCategory
          category="Bronze"
          colour="#6A3805"
          sponsors={sponsors.bronze}
        />
      </Grid>
    </div>
  );
}
