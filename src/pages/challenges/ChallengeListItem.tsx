import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  ListItem,
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
    download: string;
  };
}

export default function ChallengeListItem(props: ChallengeListItemProps) {
  const { sponsor, title, difficulty, description } = props.challenge;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItem>
          {/* <ListItemAvatar>
            <Avatar src={logo} alt={sponsor} />
          </ListItemAvatar> */}
          <ListItemText primary={title} secondary={"By " + sponsor} />
          <Chip label={difficulty} />
        </ListItem>
      </AccordionSummary>
      <Box p={2} pt={0}>
        {description.split("\n").map((paragraph, index) => (
          <AccordionDetails key={index}>
            <Typography>{paragraph}</Typography>
          </AccordionDetails>
        ))}
      </Box>
      {/* <AccordionDetails>
        <Link variant="overline" href={download}>
          Download as a PDF
        </Link>
      </AccordionDetails> */}
    </Accordion>
  );
}
