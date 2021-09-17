import {
  Box,
  makeStyles,
  Card,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20em",
    },
  },
  title: {
    fontWeight: 600,
  },
}));

export default function Team() {
  const classes = useStyles();

  return (
    <>
      <Title
        title={pages.pageItems[7].name}
        description={pages.pageItems[7].description}
      ></Title>
      <Box m={2}>
        <Card>
          <CardContent>
            <Box width="100%">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m={2}
                  >
                    <Button variant="contained" color="primary">
                      Create a team
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m={2}
                  >
                    <Button variant="contained" color="primary">
                      Join a team
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
