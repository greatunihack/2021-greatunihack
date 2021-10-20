import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function BackButton() {
  const history = useHistory();
  return (
    <Box m={2} mb={0}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        &lt;&lt;&lt; Back to Dashboard
      </Button>
    </Box>
  );
}
