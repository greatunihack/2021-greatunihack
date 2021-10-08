import { Box, makeStyles, Button, Card } from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function Discord() {
  return (
    <>
      <Title
        title={pages.pageItems[0].name}
        description={pages.pageItems[0].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
            <Box p={2} pl={0}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" color="primary">
                  Link Discord Account
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
