/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog, Grid, Typography } from "@material-ui/core";
import Button from "src/pages/dashboard/Button";
import StatusCard from "src/pages/dashboard/StatusCard";
import pages from "src/data/DashboardButtonData.json";
import PageHeaders from "src/components/headers";
import { getApp } from "@firebase/app";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "@firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import { useHistory } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [userStatus, setUserStatus] = useState<[number, string]>(() => {
    return [0, "Loading..."];
  });
  const [linkedDiscord, setLinkedDiscord] = useState(false);
  const [userNotAccepted, setUserNotAccepted] = useState(false);
  const [userRejected, setUserRejected] = useState(false);
  const history = useHistory();
  const app = getApp();
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    if (user && user === "rejected") {
      setUserRejected(true);
    } else if (user && user === "notaccepted") {
      setUserNotAccepted(true);
    } else if (user && typeof user !== "string") {
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((userDocs) => {
        if (userDocs.docs[0].data().teamId) {
          setUserStatus([100, "Joined a team"]);
          setLinkedDiscord(true);
        } else if (userDocs.docs[0].data().discordId) {
          setUserStatus([66, "Linked Discord account"]);
          setLinkedDiscord(true);
        } else {
          setUserStatus([33, "Registered"]);
        }
      });
    }
  }, [user]);

  return (
    <>
      <Dialog
        open={userNotAccepted || userRejected}
        onClose={() => {
          history.push("/");
          signOut(auth);
          history.push("/");
        }}
      >
        <Box m={3}>
          <Typography>
            {userRejected
              ? `Unfortunately, you haven't been accepted for this hackathon. If you think this is a mistake, feel free to contact us at: contact@unicsmcr.com`
              : `Please wait until we've reviewed your application! We'll send you an email if your application has succeeded or not.
`}
          </Typography>
        </Box>
      </Dialog>
      <PageHeaders title={"Dashboard"} />
      <Box mt={2}>
        <Grid container>
          <Grid container xs={12} justifyContent="center">
            <StatusCard status={userStatus} />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <Button pageDetails={pages.pageItems["Discord"]} />
            <Button
              pageDetails={pages.pageItems["Team"]}
              disabled={!linkedDiscord}
            />
            <Button pageDetails={pages.pageItems["Challenges"]} />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <Button pageDetails={pages.pageItems["Submissions"]} />
            <Button pageDetails={pages.pageItems["Sponsors"]} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
