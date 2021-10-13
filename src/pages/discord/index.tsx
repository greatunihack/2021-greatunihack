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
import { Box, Button, Card, Typography } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/components/auth/AuthContext";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

// Implement Discord OAuth
// Set return discordToken in Firebase user document to access token
export default function Discord() {
  const queryParams = new URLSearchParams(window.location.search);
  const discordCode = queryParams.get("code");
  const app = getApp();
  const db = getFirestore(app);
  const { user } = useContext(AuthContext);
  const [discordLinked, setDiscordLinked] = useState(false);

  useEffect(() => {
    if (user && user != "loading") {
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          if (document.data().discordAccessToken) {
            setDiscordLinked(true);
          }
          if (discordCode) {
            const DiscordOauth2 = require("discord-oauth2");
            const oauth = new DiscordOauth2();
            oauth
              .tokenRequest({
                clientId: process.env.REACT_APP_DISCORD_CLIENT,
                clientSecret: process.env.REACT_APP_DISCORD_SECRET,
                code: discordCode,
                scope: ["identify", "guilds.join"],
                grantType: "authorization_code",
                redirectUri: process.env.REACT_APP_DISCORD_REDIRECT_URL,
              })
              .then((response: any) => {
                axios.get('https://discord.com/api/users/@me', {
                  headers: {
                    authorization: `Bearer ${response.access_token}`,
                  },
                }).then((discord: AxiosResponse) => {
                  console.log(discord);
                  getDocs(
                    query(
                      collection(db, "users"),
                      where("email", "==", user.email)
                    )
                  ).then((querySnapshot) => {
                    querySnapshot.forEach((document) => {
                      setDoc(
                        doc(db, "users", document.id),
                        {
                          discordId: discord.data.id,
                          discordAccessToken: response.access_token,
                          discordRefreshToken: response.refresh_token,
                        },
                        { merge: true }
                      );
                      setDiscordLinked(true);
                    });
                  });
                });
              })
              .catch();
          }
        });
      });
    }
  }, []);

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
                {discordLinked ? (
                  <Typography>You have linked your Discord account!</Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (process.env.REACT_APP_DISCORD_URL) {
                        window.location.href =
                          process.env.REACT_APP_DISCORD_URL;
                      }
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
