import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "20em",
  },
  cardAction: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  italics: {
    fontStyle: "italic",
  },
}));

interface HomeButtonProps {
  pageDetails: {
    link: string;
    name: string;
    description: string;
    external?: boolean;
    restricted?: boolean;
  };
}

export default function HomeButton(props: HomeButtonProps) {
  const [earlyRestrict] = useState(() => {
    const currentTime = new Date();
    const hackathonTime = Date.parse(`${process.env.REACT_APP_HACKATHON_DATE}`);
    if (currentTime.getTime() < hackathonTime) {
      return true;
    } else {
      return false;
    }
  });
  const { pageDetails } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = useCallback(() => {
    pageDetails.external
      ? (window.location.href = pageDetails.link)
      : history.push(pageDetails.link);
  }, [history, pageDetails.link, pageDetails.external]);

  return (
    <Box m={4}>
      <Card className={classes.root}>
        <CardActionArea
          className={classes.cardAction}
          onClick={handleOnClick}
          disabled={earlyRestrict && pageDetails.restricted}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pageDetails.name}
              {earlyRestrict && pageDetails.restricted ? (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="h3"
                  className={classes.italics}
                >
                  Restricted until hackathon start
                </Typography>
              ) : null}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {pageDetails.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
