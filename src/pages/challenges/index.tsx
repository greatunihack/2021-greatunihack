import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Challenges() {
  return (
    <>
      <Box m={2}>
          <Typography variant="h3">Challenges</Typography>
      </Box>
      <Box m={2}>
          <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                  <Typography>Challenge 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
              </AccordionDetails>
          </Accordion>
      </Box>
    </>
  );
}