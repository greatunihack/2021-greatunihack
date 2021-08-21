import {
    Grid,
    Typography
} from '@material-ui/core';
import SponsorCard from './SponsorCard';

interface SponsorCategoryProps {
    category: string;
    sponsors: {
        name: string;
        image: string;
        website: string;
        description: string;
    }[];
}

export default function SponsorCategory(props: SponsorCategoryProps) {
    return (
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" align="center">{props.category}</Typography>
          {
            props.sponsors.map((sponsor) => (
              <SponsorCard sponsor={sponsor} />
            ))
          }
        </Grid>
    );
}