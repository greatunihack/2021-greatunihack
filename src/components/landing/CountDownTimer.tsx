import { useState } from "react";
import { Typography } from "@material-ui/core";

export default function CountDownTimer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const countDownDate = new Date("Oct 15, 2021 00:00:00").getTime();

  const myFunc = setInterval(function () {
    const now = new Date().getTime();

    const timeleft = countDownDate - now;

    setDays(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMins(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
    setSecs(Math.floor((timeleft % (1000 * 60)) / 1000));

    if (timeleft < 0) {
      clearInterval(myFunc);
      setDays(0);
      setHours(0);
      setMins(0);
      setSecs(0);
    }
  }, 1000);

  const countDown = `${days} days ${hours} hours ${mins} mins ${secs} secs`;

  return <Typography variant="h5">{countDown}</Typography>;
}
