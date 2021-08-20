import { Button, Grid, Box } from "@material-ui/core";

export default function Home() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box m={2}>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/profile">
            Profile
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/submissions">
            Submissions
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/sponsors">
            Sponsors
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/contact">
            Contact
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/challenges">
            Challenges
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
