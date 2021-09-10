import { Box, CircularProgress } from "@material-ui/core";

export function Loading() {
  return (
    <Box
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <CircularProgress />
    </Box>
  );
}
