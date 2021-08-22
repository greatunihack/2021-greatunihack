import {
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SponsorCard from 'src/pages/sponsors/SponsorCard';

interface SponsorCategoryProps {
    category: string;
    colour: string;
    sponsors: {
        name: string;
        image: string;
        website: string;
        description: string;
    }[];
}

const useStyles = makeStyles({
    categoryName: {
        color: (props: SponsorCategoryProps) => props.colour,
    },
});

export default function SponsorCategory(props: SponsorCategoryProps) {
    const classes = useStyles(props);
    return (
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" align="center" className={classes.categoryName}>{props.category}</Typography>
          {
            props.sponsors.map((sponsor) => (
              <SponsorCard sponsor={sponsor} />
            ))
          }
        </Grid>
    );
}