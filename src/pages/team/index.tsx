import {
  Box,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
} from "@material-ui/core";

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
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Box m={4}>
          <Card className={classes.root}>
            <CardContent>
              <Box mb={3}>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  className={classes.title}
                >
                  Team
                </Typography>
              </Box>
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
      </Box>
    </Container>
  );
}
