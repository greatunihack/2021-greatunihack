import { Grid, Typography, CardContent, Card, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SponsorCard from "src/pages/sponsors/SponsorCard";

interface SponsorCategoryProps {
  category: string;
  /* eslint-disable-next-line react/no-unused-prop-types */
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
    color: (props: SponsorCategoryProps) => {
      const { colour } = props;
      return colour;
    },
  },
});

export default function SponsorCategory(props: SponsorCategoryProps) {
  const { category, sponsors } = props;
  const classes = useStyles(props);
  return (
    <Grid item xs={12} lg={3}>
      <Box m={2}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              className={classes.categoryName}
            >
              {category}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {sponsors.map((sponsor, index) => (
        <SponsorCard key={index} sponsor={sponsor} />
      ))}
    </Grid>
  );
}
