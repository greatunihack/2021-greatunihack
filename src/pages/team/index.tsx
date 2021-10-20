/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/named */
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  updateDoc,
  deleteField,
  deleteDoc,
} from "@firebase/firestore";
import { getApp } from "@firebase/app";
import { AuthContext } from "src/components/auth/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PageHeaders from "src/components/headers";
import BackButton from "src/components/backbutton";

export default function Team() {
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [onATeam, setOnATeam] = useState(false);
  const [joinTeamOpen, setJoinTeamOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [discordNotLinked, setDiscordNotLinked] = useState(false);
  const [form, setForm] = useState({ teamName: "", teamId: "" });
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const { user } = useContext(AuthContext);
  const app = getApp();
  const db = getFirestore(app);
  const history = useHistory();

  async function getUserDoc(email: string) {
    const userDocs = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    return userDocs.docs[0];
  }

  async function getTeamDoc(teamId: string) {
    if (teamId) {
      const teamDocs = await getDocs(
        query(collection(db, "teams"), where("teamId", "==", teamId))
      );
      return teamDocs.size ? teamDocs.docs[0] : null;
    }
  }

  async function getTeamMembersDocs(teamDocId: string) {
    const teamMemberDocs = await getDocs(
      collection(db, "teams", teamDocId, "teamMembers")
    );
    return teamMemberDocs;
  }

  function openMessageBox(message: string) {
    handleClose();
    setMessageText(message);
    setMessageOpen(true);
  }

  useEffect(() => {
    async function effectFunction() {
      axios.get(`https://${process.env.REACT_APP_DISCORD_BOT_BASE}`);
      if (user && user != "loading" && user.email) {
        const userDoc = await getUserDoc(user.email);
        if (!userDoc.data().discordId) {
          setDiscordNotLinked(true);
        } else if (userDoc.data().teamId) {
          const teamDoc = await getTeamDoc(userDoc.data().teamId);
          if (teamDoc) {
            setOnATeam(true);
            setForm({
              teamName: teamDoc.data().teamName,
              teamId: teamDoc.data().teamId,
            });
            const teamMemberDocs = await getTeamMembersDocs(teamDoc.id);
            const currentTeamMembers: string[] = [];
            teamMemberDocs.forEach((teamMember) => {
              currentTeamMembers.push(teamMember.data().name);
            });
            setTeamMembers(currentTeamMembers);
          }
        }
      }
    }
    effectFunction();
  }, []);

  const handleClose = () => {
    setCreateTeamOpen(false);
    setJoinTeamOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  async function leaveTeam() {
    if (user && user != "loading" && user.email) {
      const userDoc = await getUserDoc(user.email);
      if (userDoc.data().teamId) {
        axios.delete(
          `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
            process.env.REACT_APP_DISCORD_BOT_SERVER
          }/${userDoc.data().discordId}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
            },
          }
        );
        await updateDoc(doc(db, "users", userDoc.id), {
          teamId: deleteField(),
        });
        const teamDoc = await getTeamDoc(userDoc.data().teamId);
        if (teamDoc) {
          const teamMemberDocs = await getTeamMembersDocs(teamDoc.id);
          if (teamMemberDocs.size === 1) {
            deleteDoc(doc(db, "teams", teamDoc.id));
          } else {
            teamMemberDocs.forEach((teamMember) => {
              if (user.email === teamMember.data().email) {
                deleteDoc(
                  doc(db, "teams", teamDoc.id, "teamMembers", teamMember.id)
                );
              }
            });
          }
          openMessageBox("Left team successfully!");
        }
      }
    }
  }

  async function joinTeam() {
    if (user && user != "loading" && user.email) {
      const teamDoc = await getTeamDoc(form.teamId);
      if (teamDoc) {
        const teamMemberDocs = await getTeamMembersDocs(teamDoc.id);
        if (teamMemberDocs.size < 6) {
          await addDoc(collection(db, "teams", teamDoc.id, "teamMembers"), {
            name: user.displayName,
            email: user.email,
          });
          const userDoc = await getUserDoc(user.email);
          setDoc(
            doc(db, "users", userDoc.id),
            {
              teamId: form.teamId,
            },
            { merge: true }
          );
          axios.put(
            `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
              process.env.REACT_APP_DISCORD_BOT_SERVER
            }/${userDoc.data().discordId}/${form.teamId}`,
            {},
            {
              headers: {
                Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
              },
            }
          );
        } else {
          openMessageBox("You can't have more than 6 people on the same team!");
        }
        openMessageBox("Team joined successfully!");
      } else {
        openMessageBox("Team not found!");
      }
    }
  }

  async function createTeam() {
    if (user && user != "loading" && user.email) {
      const Filter = require("bad-words"),
        filter = new Filter();
      const createTeamResponse = await axios.post(
        `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/team/${process.env.REACT_APP_DISCORD_BOT_SERVER}`,
        {
          name: filter.clean(form.teamName),
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
          },
        }
      );
      const teamId = createTeamResponse.data.replace("token", "") as string;
      const teamDocRef = await addDoc(collection(db, "teams"), {
        teamName: filter.clean(form.teamName),
        teamId: teamId,
      });
      await addDoc(collection(db, "teams", teamDocRef.id, "teamMembers"), {
        name: user.displayName,
        email: user.email,
      });
      const userDoc = await getUserDoc(user.email);
      await setDoc(
        doc(db, "users", userDoc.id),
        {
          teamId: teamId,
        },
        { merge: true }
      );
      axios.put(
        `https://${process.env.REACT_APP_DISCORD_BOT_BASE}/participant/${
          process.env.REACT_APP_DISCORD_BOT_SERVER
        }/${userDoc.data().discordId}/${teamId}`,
        {},
        {
          headers: {
            Authorization: process.env.REACT_APP_DISCORD_BOT_SECRET,
          },
        }
      );
      openMessageBox(
        `Team created successfully! Your team ID is: ${teamId}. You can share this ID with up to 5 other people.`
      );
    }
  }

  return (
    <>
      <PageHeaders title={pages.pageItems[7].name} />
      <Title
        title={pages.pageItems[7].name}
        description={pages.pageItems[7].description}
      ></Title>
      <Box m={2}>
        <Card>
          <CardContent>
            <Box width="100%">
              <Grid container alignItems="center" justifyContent="center">
                {onATeam ? (
                  <>
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>Team name: {form.teamName}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>Team ID: {form.teamId}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>
                          Team members: {teamMembers.join(", ")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={leaveTeam}
                        >
                          Leave team
                        </Button>
                      </Box>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} md={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setCreateTeamOpen(true);
                          }}
                        >
                          Create a team
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setJoinTeamOpen(true);
                          }}
                        >
                          Join a team
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <Box m={2}>
          <BackButton />
        </Box>
      </Box>
      <Dialog open={createTeamOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Create a team</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="teamName"
            label="Team Name"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTeam} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={joinTeamOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Join a team</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="teamId"
            label="Team ID"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={joinTeam} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={messageOpen}
        onClose={() => {
          window.location.reload();
        }}
      >
        <Box m={3}>
          <Typography>{messageText}</Typography>
        </Box>
      </Dialog>
      <Dialog
        open={discordNotLinked}
        onClose={() => {
          history.push("/dashboard/home");
        }}
      >
        <Box m={3}>
          <Typography>
            Please link your Discord account before joining a team!
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
