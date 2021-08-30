import { Box, Grid } from "@material-ui/core";
import PageButton from "src/pages/home/PageButton";
import StatusCard from "src/pages/home/StatusCard";
import pages from "src/pages/home/PageButtonData.json";

export default function Home() {
  return (
    <Box mt={2}>
      <Grid container>
        <Grid container xs={12} justifyContent="center">
          <StatusCard />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <PageButton pageDetails={pages.pageItems[0]} />
          <PageButton pageDetails={pages.pageItems[2]} />
          <PageButton pageDetails={pages.pageItems[4]} />
          <PageButton pageDetails={pages.pageItems[6]} />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <PageButton pageDetails={pages.pageItems[1]} />
          <PageButton pageDetails={pages.pageItems[3]} />
          <PageButton pageDetails={pages.pageItems[5]} />
        </Grid>
      </Grid>
    </Box>
  );
}
