import { Grid } from "@material-ui/core";
import SponsorCategory from "src/pages/sponsors/SponsorCategory";
import sponsors from "src/data/SponsorData.json";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import PageHeaders from "src/components/headers";

export default function Sponsors() {
  return (
    <>
      <PageHeaders title={pages.pageItems[2].name} />
      <Title
        title={pages.pageItems[2].name}
        description={pages.pageItems[2].description}
      ></Title>
      <Grid container>
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
    </>
  );
}
