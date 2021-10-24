import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";

interface TitleProps {
  title: string;
  description: string;
}

export default function Title(props: TitleProps) {
  return (
    <Box m={2} mb={0}>
      <Card>
        <CardContent>
          <Box p={2}>
            <Typography gutterBottom variant="h3">
              {props.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
