/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-ui/core";
import Countdown from "react-countdown";

export default function CountdownTimer() {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
      <Typography variant="h4">
        {`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      </Typography>
    );
  };

  return (
    <Countdown
      date={process.env.REACT_APP_HACKATHON_DATE}
      renderer={renderer}
    />
  );
}
