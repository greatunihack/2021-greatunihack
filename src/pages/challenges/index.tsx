import { Box } from "@material-ui/core";
import ChallengeListItem from "src/pages/challenges/ChallengeListItem";
import challenges from "src/data/ChallengeData.json";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import PageHeaders from "src/components/headers";

export default function Challenges() {
  return (
    <>
      <PageHeaders title={pages.pageItems[4].name} />
      <Title
        title={pages.pageItems[4].name}
        description={pages.pageItems[4].description}
      ></Title>

      <Box m={2}>
        {challenges.map((challenge, index) => (
          <ChallengeListItem key={index} challenge={challenge} />
        ))}
      </Box>
    </>
  );
}
