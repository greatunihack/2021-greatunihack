import { Container, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CountdownTimer from "src/components/landing/CountdownTimer";
import Logo from "src/images/logo512.png";

const useStyles = makeStyles(() => ({
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
  button: {
    marginTop: "30px",
  },
}));

export default function Launch() {
  const classes = useStyles();
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.box}
      >
        <img src={Logo} className={classes.media}></img>
        <Box className={classes.info}>
          <Typography variant="h4" className={classes.title}>
            15th - 16th October at Manchester
          </Typography>
          <CountdownTimer />
          <Box m={1}>
            <Button
              variant="contained"
              component={Link}
              to="/apply"
              className={classes.button}
            >
              Apply Now!
            </Button>
          </Box>
          <Box m={1}>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              className={classes.button}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
