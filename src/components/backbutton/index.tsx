import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export default function BackButton() {
  return (
    <Box m={2} mb={0}>
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        variant="contained"
        color="primary"
        component={Link}
        to="/dashboard/home"
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}
