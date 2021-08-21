import { 
  Grid,
  Typography
} from "@material-ui/core";
import { useState } from 'react';

export default function Sponsors() {
  return (
    <div id="Sponsors">
      <Typography variant="h3">Sponsors</Typography>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" align="center">Gold</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" align="center">Silver</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" align="center">Bronze</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
