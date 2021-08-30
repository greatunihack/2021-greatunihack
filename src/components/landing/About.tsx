import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
}));

export default function About() {
  const classes = useStyle();
  return (
    <Container className={classes.root}>
      <Typography variant="h4" align="center">
        About Us
      </Typography>
      <Grid container spacing={2} xs={12} sm={6} md={4}>
        <Grid item>
          <Typography style={{ fontSize: "20px", padding: "20px" }}>
            Insert paragraph about Hackathon and UniCS.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
