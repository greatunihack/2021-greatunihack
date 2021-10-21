import { Box, Grid } from "@material-ui/core";
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
import { useContext, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [userStatus, setUserStatus] = useState<[number, string]>(() => {
    return [0, "Loading..."];
  });
  const [linkedDiscord, setLinkedDiscord] = useState(false);

  if (userStatus[0] === 0) {
    const app = getApp();
    const db = getFirestore(app);
    if (user && user != "loading") {
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
  }

  return (
    <>
      <PageHeaders title={"Dashboard"} />
      <Box mt={2}>
        <Grid container>
          <Grid container xs={12} justifyContent="center">
            <StatusCard status={userStatus} />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <Button pageDetails={pages.pageItems[0]} />
            <Button pageDetails={pages.pageItems[4]} />
            <Button pageDetails={pages.pageItems[1]} />
            <Button pageDetails={pages.pageItems[7]} disabled={linkedDiscord} />
          </Grid>
          <Grid container xs={12} justifyContent="center">
            <Button pageDetails={pages.pageItems[2]} />
            {/* <Button pageDetails={pages.pageItems[5]} /> */}
            <Button pageDetails={pages.pageItems[6]} />
            <Button pageDetails={pages.pageItems[3]} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
