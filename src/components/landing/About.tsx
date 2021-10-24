import { Typography, Box, Container, makeStyles } from "@material-ui/core";
const useStyle = makeStyles(() => ({
  body: {
    backgroundColor: "#272727",
    color: "#fafdf6",
    paddingTop: "30px",
  },
  title: {
    // borderBottomStyle: "solid",
    paddingBottom: "5px",
  },
  info: {
    fontSize: "20px",
    padding: "40px",
  },
}));

export default function About() {
  const classes = useStyle();
  return (
    <div className={classes.body}>
      <Box id="about">
        <Container>
          <Typography variant="h4" align="center">
            <a className={classes.title}>About Us</a>
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography className={classes.info}>
              We are{" "}
              {process.env.REACT_APP_HACKATHON_NAME?.substring(
                0,
                process.env.REACT_APP_HACKATHON_NAME?.lastIndexOf(" ")
              )}
              , an annual 24-hour student-oriented hackathon organised by the
              University of Manchester tech society, UniCS. Since 2014, we have
              brought together students from 88 universities across Europe to
              work and develop innovative ideas in a competitive environment.
              The hackathon this year will again be online to keep us all safe
              whilst COVID is still with us, but we have worked very hard to
              ensure the hackathon is as amazing as ever!
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
