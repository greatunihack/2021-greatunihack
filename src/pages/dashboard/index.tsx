import { Box, Grid } from "@material-ui/core";
import Button from "src/pages/dashboard/Button";
import StatusCard from "src/pages/dashboard/StatusCard";
import pages from "src/data/DashboardButtonData.json";

export default function Dashboard() {
  return (
    <Box mt={2}>
      <Grid container>
        <Grid container xs={12} justifyContent="center">
          <StatusCard />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Button pageDetails={pages.pageItems[0]} />
          <Button pageDetails={pages.pageItems[4]} />
          <Button pageDetails={pages.pageItems[1]} />
          <Button pageDetails={pages.pageItems[7]} />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Button pageDetails={pages.pageItems[2]} />
          <Button pageDetails={pages.pageItems[5]} />
          <Button pageDetails={pages.pageItems[6]} />
          <Button pageDetails={pages.pageItems[3]} />
        </Grid>
      </Grid>
    </Box>
  );
}
