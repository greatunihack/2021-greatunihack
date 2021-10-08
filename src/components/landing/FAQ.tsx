import {
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Box,
  makeStyles,
} from "@material-ui/core";
import FAQData from "src/data/FAQData";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#a59132",
    color: "#fafdf6",
    paddingBottom: "30px",
    display: "block",
    paddingTop: "30px",
  },

  title: {
    padding: "10px",
    borderBottomStyle: "solid",
    paddingBottom: "5px",
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
  },

  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#30362f",
    color: "#fafdf6",
  },
  CardContent: {
    flexGrow: 1,
  },
}));

export default function FAQ() {
  const classes = useStyles();

  return (
    <Box className={classes.root} id="faq">
      <Typography variant="h4" align="center">
        <a className={classes.title}>FAQ</a>
      </Typography>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {FAQData.map((data, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h5">
                    {data.question}
                  </Typography>
                  <Typography>{data.answer}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
