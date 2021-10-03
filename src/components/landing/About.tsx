import { Typography, Box, Container, makeStyles } from "@material-ui/core";
const useStyle = makeStyles(() => ({
  body: {
    backgroundColor: "#a59132",
    color: "#fafdf6",
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
            About Us
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography className={classes.info}>
              We are GreatUniHack, an annual 24-hour student-oriented hackathon
              organised by the University of Manchester tech society, UniCS.
              Since 2014, we have brought together 2500 students from 88
              universities across Europe to work and develop innovative ideas in
              a competitive environment. This year&apos;s edition aims to
              introduce a new generation of developers with great potential for
              improving the technology industry and community through our online
              hackathon.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
