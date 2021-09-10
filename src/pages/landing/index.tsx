import { Button, Grid, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box m={2}>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/apply">
            Apply
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/home">
            Dashboard
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
