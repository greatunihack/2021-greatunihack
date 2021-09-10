import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import suggestions from "src/data/ErrorSuggestionData.json";

interface ErrorProps {
  code?: number;
  message?: string;
}

const useStyles = makeStyles({
  outerWrapper: {
    margin: "-16px 0",
    height: "100%",
  },
  innerWrapper: {
    height: "calc(100% - 100px)",
  },
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  footer: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    width: "calc(100% - 16px)",
  },
  icon: {
    fontSize: "42vh",
    width: "100%",
  },
  code: {
    fontSize: "20vh",
  },
  message: {
    fontSize: "6vh",
  },
  tip: {
    fontSize: "3vh",
  },
});

export default function Error(props: ErrorProps) {
  const { code, message } = props;
  const classes = useStyles();

  const index = Math.floor(Math.random() * suggestions.length); // Generates random number between 0 and one less than the number of suggestions
  const tip = suggestions[index];

  return (
    <Box className={classes.outerWrapper}>
      <Grid container className={classes.innerWrapper}>
        <Grid item xs={12} md={6} className={classes.root}>
          <Typography className={classes.code}>{code ?? 400}</Typography>
          <Typography className={classes.message}>
            {message ?? "Something Went Wrong"}
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item md={6} className={classes.root}>
            <ReportProblemOutlinedIcon className={classes.icon} />
          </Grid>
        </Hidden>
      </Grid>
      <Hidden smDown>
        <Box className={classes.footer}>
          <Typography className={classes.tip}>
            <strong>Hackathon Tip {index + 1}:</strong> {tip}
          </Typography>
        </Box>
      </Hidden>
    </Box>
  );
}
