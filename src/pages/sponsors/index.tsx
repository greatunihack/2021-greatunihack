import { 
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import { useState } from 'react';
import SponsorCategory from './SponsorCategory';

export default function Sponsors() {
  const [state, ] = useState({
    "gold": [
      {
        "name": "Scarfolk Tech Company Ltd.",
        "website": "https://unicsmcr.com/",
        "image": "https://picsum.photos/700/400",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mollis dolor. Mauris vel neque sed augue aliquet aliquet."
      },
      {
        "name": "Harchester Printing Solutions",
        "website": "https://unicsmcr.com/",
        "image": "https://picsum.photos/700/400",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mollis dolor. Mauris vel neque sed augue aliquet aliquet."
      }
    ],
    "silver": [
      {
        "name": "Walford Development Services",
        "website": "https://unicsmcr.com/",
        "image": "https://picsum.photos/700/400",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mollis dolor. Mauris vel neque sed augue aliquet aliquet."
      }
    ],
    "bronze": [
      {
        "name": "Akenfield Networking",
        "website": "https://unicsmcr.com/",
        "image": "https://picsum.photos/700/400",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mollis dolor. Mauris vel neque sed augue aliquet aliquet."
      }
    ]
  });

  return (
    <div id="Sponsors">
      <Box m={2}>
        <Typography variant="h3">Sponsors</Typography>
      </Box>
      <Grid container>
        <SponsorCategory category="Gold" colour="#AF9500" sponsors={state.gold} />
        <SponsorCategory category="Silver" colour="#B4B4B4" sponsors={state.silver} />
        <SponsorCategory category="Bronze" colour="#6A3805" sponsors={state.bronze} />
      </Grid>
    </div>
  );
}
