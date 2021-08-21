import { 
  Grid,
  Typography
} from "@material-ui/core";
import { useState } from 'react';
import SponsorCategory from './SponsorCategory';

export default function Sponsors() {
  const [state, setState] = useState({
    "gold": [
      {
        "name": "Scarfolk Tech Company Ltd.",
        "website": "https://unicsmcr.com/",
        "image": "https://picsum.photos/700/400",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mollis dolor. Mauris vel neque sed augue aliquet aliquet."
      }
    ],
    "silver": [

    ],
    "bronze": [

    ]
  });

  return (
    <div id="Sponsors">
      <Typography variant="h3">Sponsors</Typography>
      <Grid container>
        <SponsorCategory category="Gold" sponsors={state.gold} />
        <SponsorCategory category="Silver" sponsors={state.silver} />
        <SponsorCategory category="Bronze" sponsors={state.bronze} />
      </Grid>
    </div>
  );
}
