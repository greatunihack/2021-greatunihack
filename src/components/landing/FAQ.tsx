import {
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FAQData from "./FAQData";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e8e8e6",
    paddingBottom: "30px",
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
    <div className={classes.root} id="faq">
      <Typography variant="h4" align="center" style={{ padding: "20px" }}>
        FAQ
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
    </div>
  );
}
