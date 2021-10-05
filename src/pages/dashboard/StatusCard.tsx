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
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

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
    return [0, ""];
  });

  if (userStatus[0] === 0) {
    // TODO: This is very inefficient
    const app = getApp();
    const db = getFirestore(app);
    if (user && user != "loading") {
      const q = query(collection(db, "users"));
      // eslint-disable-next-line
      const usersData: any[] = [];
      getDocs(q).then((users) => {
        users.forEach((user) => usersData.push(user.data()));
        const userData = usersData.filter(
          (x) => x.email.toLowerCase() == user.email?.toLowerCase()
        )[0];

        if (userData.team) {
          setUserStatus([100, "Joined Team"]);
        } else if (userData.discord) {
          setUserStatus([75, "Linked Discord Account"]);
        } else {
          setUserStatus([50, "Registered"]);
        }
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
          {/* TODO: Get status from Firebase, set according text and progressbar values */}
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
