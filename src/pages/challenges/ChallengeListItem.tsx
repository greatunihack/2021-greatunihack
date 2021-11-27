/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface ChallengeListItemProps {
  challenge: {
    sponsor: string;
    logo: string;
    title: string;
    difficulty: string;
    description: string;
    video: string;
  };
}

export default function ChallengeListItem(props: ChallengeListItemProps) {
  const { sponsor, title, difficulty, description, logo, video } =
    props.challenge;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={logo} alt={sponsor} />
          </ListItemAvatar>
          <ListItemText primary={title} secondary={"By " + sponsor} />
          <Chip label={difficulty} />
        </ListItem>
      </AccordionSummary>
      <Box p={2} pt={0}>
        {/* {description.split("\n").map((paragraph, index) => (
          <AccordionDetails key={index}>
          <Typography>{paragraph}</Typography>
          </AccordionDetails>
        ))} */}
        <AccordionDetails>
          <Box pl={2}>
            <Link variant="overline" href={video}>
              {`Watch the ${sponsor} challenge video!`}
            </Link>
          </Box>
        </AccordionDetails>
      </Box>
    </Accordion>
  );
}
