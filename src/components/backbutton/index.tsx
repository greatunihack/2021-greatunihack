import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Box m={2} mb={0}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/dashboard/home"
      >
        &lt;&lt;&lt; Back to Dashboard
      </Button>
    </Box>
  );
}
