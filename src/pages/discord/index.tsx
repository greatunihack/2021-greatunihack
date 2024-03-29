/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { getApp } from "@firebase/app";
import {
  getDocs,
  query,
  collection,
  where,
  setDoc,
  doc,
  getFirestore,
} from "@firebase/firestore";
import { Box, Button, Card, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import { useHistory } from "react-router-dom";
import PageHeaders from "src/components/headers/index";
import BackButton from "src/components/backbutton";

export default function Discord() {
  const app = getApp();
  const db = getFirestore(app);
  const { user } = useContext(AuthContext);
  const [discordLinked, setDiscordLinked] = useState(false);
  const history = useHistory();
  async function getUserDoc(email: string | null) {
    const userDocs = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    return userDocs.docs[0];
  }

  useEffect(() => {
    async function effectFunction() {
      const queryParams = new URLSearchParams(window.location.search);
      const discordCode = queryParams.get("code");

      if (user && typeof user !== "string") {
        const userDoc = await getUserDoc(user.email);
        if (userDoc.data().discordId) {
          setDiscordLinked(true);
        } else if (discordCode) {
          queryParams.delete("code");
          history.replace({
            search: queryParams.toString(),
          });

          const res = await axios
            .post("/.netlify/functions/discord", {
              code: discordCode,
              redirect: `${window.location.origin}/dashboard/discord`,
            })
            .catch();

          if (res.data) {
            const discordAccessRequest = await axios.get(
              "https://discord.com/api/users/@me",
              {
                headers: {
                  authorization: `Bearer ${res.data}`,
                },
              }
            );
            await setDoc(
              doc(db, "users", userDoc.id),
              {
                discordId: discordAccessRequest.data.id,
              },
              { merge: true }
            );
            setDiscordLinked(true);
          }
        }
      }
    }
    effectFunction();
  }, []);

  return (
    <>
      <PageHeaders title={pages.pageItems["Discord"].name} />
      <BackButton />
      <Title
        title={pages.pageItems["Discord"].name}
        description={pages.pageItems["Discord"].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
            <Box p={2} pl={0}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {discordLinked ? (
                  <Grid container>
                    <Grid item xs={12}>
                      <Box
                        p={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>
                          You have linked your Discord account! You can join the{" "}
                          {process.env.REACT_APP_HACKATHON_NAME} Discord server
                          below.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        p={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            window.open(
                              `${process.env.REACT_APP_DISCORD_SERVER_LINK}`,
                              "_blank"
                            );
                          }}
                        >
                          Join Discord server
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${
                        process.env.REACT_APP_DISCORD_CLIENT
                      }&redirect_uri=${encodeURIComponent(
                        `${window.location.origin}/dashboard/discord`
                      )}&response_type=code&scope=identify%20guilds.join`;
                    }}
                  >
                    Link Discord Account
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
