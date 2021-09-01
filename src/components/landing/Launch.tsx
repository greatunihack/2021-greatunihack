import { Container, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import Logo from "./logo512.png";

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
  },
  media: {
    width: "70%",
    marginLeft: "10px",
    marginTop: "10px",
  },
  info: {
    padding: "30px",
    marginTop: "20px",
  },
}));

export default function Launch() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item>
          <img src={Logo} className={classes.media}></img>
        </Grid>
        <Grid item className={classes.info} alignItems="center">
          <Typography variant="h4" style={{ paddingBottom: "20px" }}>
            15th - 16th October at Manchester
          </Typography>
          <CountDownTimer />
          <Button
            variant="contained"
            component={Link}
            to="/apply"
            style={{ marginTop: "30px" }}
          >
            Register Now!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
