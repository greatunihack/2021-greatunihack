import { 
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import SponsorCategory from 'src/pages/sponsors/SponsorCategory';
import sponsors from 'src/pages/sponsors/SponsorData.json';

export default function Sponsors() {
  return (
    <>
      <Box m={2}>
        <Typography variant="h3">Sponsors</Typography>
      </Box>
      <Grid container>
        <SponsorCategory category="Gold" colour="#AF9500" sponsors={sponsors.gold} />
        <SponsorCategory category="Silver" colour="#B4B4B4" sponsors={sponsors.silver} />
        <SponsorCategory category="Bronze" colour="#6A3805" sponsors={sponsors.bronze} />
      </Grid>
    </>
  );
}
