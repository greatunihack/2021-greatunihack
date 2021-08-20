import { Button, Grid, Box } from "@material-ui/core";

export default function landing() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box m={2}>
        <Box m={4}>
          <Button variant="contained" href="/login">
            Login
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/apply">
            Apply
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" href="/dashboard/home">
            Dashboard
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
