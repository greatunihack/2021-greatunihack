import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import legal from "src/data/LegalData.json";

export default function Legal() {
  return (
    <Box m={3}>
      <Typography>{legal[0]}</Typography>
    </Box>
  );
}
