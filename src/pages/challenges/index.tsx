import { Box } from "@material-ui/core";
import ChallengeListItem from "src/pages/challenges/ChallengeListItem";
import challenges from "src/data/ChallengeData.json";
import fakechallenges from "src/data/FakeChallengeData.json";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import { useState } from "react";

export default function Challenges() {
  const [earlyRestrict] = useState(() => {
    const currentTime = new Date();
    const hackathonTime = Date.parse(`${process.env.REACT_APP_HACKATHON_DATE}`);
    if (currentTime.getTime() < hackathonTime) {
      return true;
    } else {
      return false;
    }
  });
  return (
    <>
      <Title
        title={pages.pageItems[4].name}
        description={pages.pageItems[4].description}
      ></Title>
      {earlyRestrict ? (
        <Box m={2}>
          {fakechallenges.map((challenge, index) => (
            <ChallengeListItem key={index} challenge={challenge} />
          ))}
        </Box>
      ) : (
        <Box m={2}>
          {challenges.map((challenge, index) => (
            <ChallengeListItem key={index} challenge={challenge} />
          ))}
        </Box>
      )}
    </>
  );
}
