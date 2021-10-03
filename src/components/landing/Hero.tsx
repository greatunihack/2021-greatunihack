import { Container, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CountdownTimer from "src/components/landing/CountdownTimer";
import Logo from "src/images/logo512.png";

const useStyles = makeStyles(() => ({
  hero: {
    backgroundColor: "#a59132",
    color: "#fafdf6",
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
    padding: "30px",
  },
  plug: {
    marginTop: "20px",
  },
  nuclear: {
    color: "#ddd92a",
  },
  button: {
    marginTop: "30px",
    marginLeft: "5px",
    backgroundColor: "#a59132",
    border: "1px solid #fafdf6",
    color: "#fafdf6",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#fafdf6",
      color: "black",
    },
  },
}));

export default function Launch() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
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
              27th - 28th November
            </Typography>
            <CountdownTimer />
            <Typography variant="h6" className={classes.plug}>
              Join us for another coding challenge, with a theme of{" "}
              <a className={classes.nuclear}>NUCLEAR FALLOUT</a>. There is a lot
              to enjoy and take part in!
            </Typography>
            <Box>
              <Button
                variant="contained"
                component={Link}
                to="/apply"
                className={classes.button}
              >
                Apply Now!
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
