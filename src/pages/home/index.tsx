import { Button, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box m={2}>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/profile">
            Profile
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/submissions">
            Submissions
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/sponsors">
            Sponsors
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/contact">
            Contact
          </Button>
        </Box>
        <Box m={4}>
          <Button variant="contained" component={Link} to="/dashboard/challenges">
            Challenges
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
