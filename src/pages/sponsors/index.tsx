import { Grid } from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import PageHeaders from "src/components/headers";
import SponsorSection from "src/pages/sponsors/SponsorSection";

export default function Sponsors() {
  return (
    <>
      <PageHeaders title={pages.pageItems[2].name} />
      <Title
        title={pages.pageItems[2].name}
        description={pages.pageItems[2].description}
      ></Title>
      <Grid container>
        <SponsorSection />
      </Grid>
    </>
  );
}
