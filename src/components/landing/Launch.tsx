import { Container, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

export default function Launch() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container justify="center">
        <Button variant="contained" component={Link} to="/apply">
          Register now!
        </Button>
      </Grid>
    </Container>
  );
}
