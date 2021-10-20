import { Box, Grid } from "@material-ui/core";
import ReactPlayer from "react-player";
import PageHeaders from "src/components/headers";
import BackButton from "src/components/backbutton";

export default function Twitch() {
  return (
    <>
      <PageHeaders title={"Twitch"} />
      <Grid container xs={12} justifyContent="center" alignContent="center">
        <Box mt={2}>
          <ReactPlayer
            url={`https://www.twitch.tv/${process.env.REACT_APP_TWITCH_CHANNEL}`}
            width="80vw"
            height="80vh"
            playing
          />
        </Box>
      </Grid>
      <Box m={2}>
        <BackButton />
      </Box>
    </>
  );
}
