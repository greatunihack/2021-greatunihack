import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20em",
    },
  },
  title: {
    fontWeight: 600,
  },
}));

interface StatusProps {
  status: [number, string];
}

export default function HomeButton(props: StatusProps) {
  const classes = useStyles();

  return (
    <Box m={4}>
      <Card className={classes.root}>
        <CardContent>
          <Box mb={3}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              className={classes.title}
            >
              Status
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={2}>
              <LinearProgress variant="determinate" value={props.status[0]} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${props.status[0]}%`}</Typography>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="body2" component="p" align="center">
              {`${props.status[1]}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
