import { Box } from "@material-ui/core";
import ChallengeListItem from "src/pages/challenges/ChallengeListItem";
import challenges from "src/data/ChallengeData.json";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import PageHeaders from "src/components/headers";
import BackButton from "src/components/backbutton";

export default function Challenges() {
  return (
    <>
      <BackButton />
      <PageHeaders title={pages.pageItems["Challenges"].name} />
      <Title
        title={pages.pageItems["Challenges"].name}
        description={pages.pageItems["Challenges"].description}
      ></Title>

      <Box m={2}>
        {challenges.map((challenge, index) => (
          <ChallengeListItem key={index} challenge={challenge} />
        ))}
      </Box>
    </>
  );
}
