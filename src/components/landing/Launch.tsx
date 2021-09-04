import { Container, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import Logo from "./logo512.png";

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
  },
  media: {
    width: "30%",
    marginLeft: "10px",
    marginTop: "10px",
  },
  title: {
    marginBottom: "20px",
  },
  box: {
    padding: "10px",
  },
  info: {
    padding: "40px",
    marginLeft: "40px",
  },
}));

export default function Launch() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.box}
        >
          <img src={Logo} className={classes.media}></img>
          <div className={classes.info}>
            <Typography variant="h4" className={classes.title}>
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
          </div>
        </Box>
      </Container>
    </div>
  );
}
