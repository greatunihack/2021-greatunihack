import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { useState, useContext } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20em",
    },
  },
  title: {
    fontWeight: 600,
  },
}));

export default function HomeButton() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [userStatus, setUserStatus] = useState<[number, string]>(() => {
    return [0, "Loading..."];
  });

  if (userStatus[0] === 0) {
    const app = getApp();
    const db = getFirestore(app);
    if (user && user != "loading") {
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          if (document.data().team) {
            setUserStatus([100, "Joined a team"]);
          } else if (document.data().discordAccessToken) {
            setUserStatus([66, "Linked Discord account"]);
          } else {
            setUserStatus([33, "Registered"]);
          }
        });
      });
    }
  }

  return (
    <Box m={4}>
      <Card className={classes.root}>
        <CardContent>
          <Box mb={3}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              className={classes.title}
            >
              Status
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={2}>
              <LinearProgress variant="determinate" value={userStatus[0]} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${userStatus[0]}%`}</Typography>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="body2" component="p" align="center">
              {`${userStatus[1]}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
