import { 
    Box,
    Typography
} from "@material-ui/core";
import ChallengeListItem from 'src/pages/challenges/ChallengeListItem';
import challenges from 'src/pages/challenges/ChallengeData.json';

export default function Challenges() {
  return (
    <>
      <Box m={2}>
          <Typography variant="h3">Challenges</Typography>
      </Box>
      <Box m={2}>
          {
              challenges.map((challenge) => (
                  <ChallengeListItem name={challenge.name} description={challenge.description} />
              ))
          }
      </Box>
    </>
  );
}