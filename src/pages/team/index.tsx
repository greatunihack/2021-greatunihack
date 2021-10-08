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
import { useContext, useEffect, useState } from "react";
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

export default function Team() {
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [onATeam, setOnATeam] = useState(false);
  const [joinTeamOpen, setJoinTeamOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [form, setForm] = useState({ teamName: null, teamId: null });
  const [teamMembers, setTeamMembers] = useState({});
  const app = getApp();
  const db = getFirestore(app);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user != "loading") {
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        console.log(querySnapshot.size);

        querySnapshot.forEach((document) => {
          if (document.data().teamId) {
            getDocs(
              query(
                collection(db, "teams"),
                where("teamId", "==", document.data().teamId)
              )
            ).then((querySnapshot) => {
              querySnapshot.forEach((document) => {
                setOnATeam(true);
                setForm({
                  teamName: document.data().teamName,
                  teamId: document.data().teamId,
                });

                getDocs(
                  collection(db, "teams", document.id, "teamMembers")
                ).then((querySnapshot) => {
                  querySnapshot.forEach((document) => {
                    setTeamMembers({
                      ...teamMembers,
                      [document.data().name]: document.data().email,
                    });
                  });
                  console.log(teamMembers);
                });
              });
            });
          }
        });
      });
    }
  }, []);

  const handleClose = () => {
    setCreateTeamOpen(false);
    setJoinTeamOpen(false);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  function leaveTeam() {
    if (user && user != "loading") {
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          if (document.data().teamId) {
            updateDoc(doc(db, "users", document.id), {
              teamId: deleteField(),
            });
            getDocs(
              query(
                collection(db, "teams"),
                where("teamId", "==", document.data().teamId)
              )
            ).then((querySnapshot) => {
              querySnapshot.forEach((document) => {
                getDocs(
                  query(
                    collection(db, "teams", document.id, "teamMembers"),
                    where("email", "==", user.email)
                  )
                ).then((querySnapshot) => {
                  querySnapshot.forEach((document_user) => {
                    deleteDoc(
                      doc(
                        db,
                        "teams",
                        document.id,
                        "teamMembers",
                        document_user.id
                      )
                    );
                    handleClose();
                    setMessageText("Left team successfully!");
                    setMessageOpen(true);
                  });
                });
              });
            });
          }
        });
      });
    }
  }

  function joinTeam() {
    if (!(user == "loading" || user == null)) {
      getDocs(
        query(collection(db, "teams"), where("teamId", "==", form.teamId))
      ).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((document) => {
            const teamId = document.data().teamid;
            addDoc(collection(db, "teams", document.id, "teamMembers"), {
              name: user.displayName,
              email: user.email,
            });
            getDocs(
              query(collection(db, "users"), where("email", "==", user.email))
            ).then((querySnapshot) => {
              querySnapshot.forEach((document) => {
                setDoc(
                  doc(db, "users", document.id),
                  {
                    teamId: teamId,
                  },
                  { merge: true }
                );
              });
            });
          });
          handleClose();
          setMessageText("Team joined successfully!");
          setMessageOpen(true);
        } else {
          handleClose();
          setMessageText("Team not found!");
          setMessageOpen(true);
        }
      });
    }
  }

  function createTeam() {
    if (!(user == "loading" || user == null)) {
      const uuid = require("uuid");
      const teamId = uuid.v4();
      const Filter = require("bad-words"),
        filter = new Filter();
      addDoc(collection(db, "teams"), {
        teamName: filter.clean(form.teamName),
        teamId: teamId,
      }).then((docRef) => {
        addDoc(collection(db, "teams", docRef.id, "teamMembers"), {
          name: user.displayName,
          email: user.email,
        });
      });
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          setDoc(
            doc(db, "users", document.id),
            {
              teamId: teamId,
            },
            { merge: true }
          );
        });
      });
      handleClose();
      setMessageText(`Team created successfully! Your team ID is: ${teamId}`);
      setMessageOpen(true);
    }
  }

  return (
    <>
      <Title
        title={pages.pageItems[7].name}
        description={pages.pageItems[7].description}
      ></Title>
      <Box m={2}>
        <Card>
          <CardContent>
            <Box width="100%">
              <Grid container>
                {onATeam ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <Box m={2}>
                        <Typography>Team name: {form.teamName}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box m={2}>
                        <Typography>Team ID: {form.teamId}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box m={2}>
                        <Typography>Team Members:</Typography>
                      </Box>
                    </Grid>

                    {Object.keys(teamMembers).map((data) => (
                      <Grid item xs={12}>
                        <Box m={2}>
                          <Typography>{data}</Typography>
                        </Box>
                      </Grid>
                    ))}

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
    </>
  );
}
