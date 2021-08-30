import {
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e8e8e6",
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  CardContent: {
    flexGrow: 1,
  },
}));

export default function FAQ() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" style={{ padding: "20px" }}>
        FAQ
      </Typography>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.CardContent}>
                <Typography gutterBottom variant="h5">
                  What is a Hackathon?
                </Typography>
                <Typography>
                  Hackathons are awesome events full of creativity, tech and
                  passionate students collaborating. We work in teams to create
                  apps, games, robots… literally anything you want to build and
                  learn about!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.CardContent}>
                <Typography gutterBottom variant="h5">
                  How much does it cost?
                </Typography>
                <Typography>
                  Absolute free if you are accepted and we provide you with swag
                  and fun yay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.CardContent}>
                <Typography gutterBottom variant="h5">
                  What if I don’t have a team?
                </Typography>
                <Typography>
                  No need to worry! Part of the fun of a hackathon is meeting
                  new people. We will have time at the beginning of the event
                  for everyone to meet and form teams.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.CardContent}>
                <Typography gutterBottom variant="h5">
                  What should I bring?
                </Typography>
                <Typography>
                  Make sure you have got your laptop, chargers, phone for some
                  games and good internet.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
