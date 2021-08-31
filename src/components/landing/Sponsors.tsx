import { Gold, Silver, Bronze } from "./SponsorsData";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: "30px",
  },

  cardGrid: {
    // paddingTop: theme.spacing(8),
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  CardContent: {
    flexGrow: 1,
  },
}));

export default function Sponsors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" style={{ padding: "20px" }}>
        Sponsors
      </Typography>
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h5" align="center" style={{ padding: "20px" }}>
          Gold
        </Typography>
        <Grid container spacing={4}>
          {Gold.map((data, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={data.logo} />
                <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h6">
                    {data.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" href={data.website}>
                    Visit website
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h5" align="center" style={{ padding: "20px" }}>
          Silver
        </Typography>
        <Grid container spacing={4}>
          {Silver.map((data, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={data.logo} />
                <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h6">
                    {data.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" href={data.website}>
                    Visit website
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h5" align="center" style={{ padding: "20px" }}>
          Bronze
        </Typography>
        <Grid container spacing={4}>
          {Bronze.map((data, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={data.logo} />
                <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h6">
                    {data.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" href={data.website}>
                    Visit website
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
