import {
  Box,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    width: "40vh",
  },
}));

interface HomeButtonProps {
  pageDetails: {
    link: string;
    name: string;
    description: string;
  };
}

export default function HomeButton(props: HomeButtonProps) {
  const { pageDetails } = props;
  const classes = useStyles();

  return (
    <Box m={4}>
      <Card className={classes.root}>
        <CardActionArea component={Link} to={pageDetails.link}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pageDetails.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {pageDetails.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
