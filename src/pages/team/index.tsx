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
} from "@material-ui/core";
import { useContext, useState } from "react";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { getApp } from "@firebase/app";
import { AuthContext } from "src/components/auth/AuthContext";

export default function Team() {
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [joinTeamOpen, setJoinTeamOpen] = useState(false);
  const [form, setForm] = useState({ teamName: null, teamId: null });
  const app = getApp();
  const db = getFirestore(app);
  const { user } = useContext(AuthContext);

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

  function joinTeam() {
    if (!(user == "loading" || user == null)) {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("teamId", "==", form.teamId));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          addDoc(collection(db, "teams", doc.id, "teamMembers"), {
            name: user.displayName,
            email: user.email,
          });
        });
      });
    }
  }

  function createTeam() {
    if (!(user == "loading" || user == null)) {
      const uuid = require("uuid");
      const Filter = require("bad-words"),
        filter = new Filter();
      try {
        addDoc(collection(db, "teams"), {
          teamName: filter.clean(form.teamName),
          teamId: uuid.v4(),
        }).then((docRef) => {
          addDoc(collection(db, "teams", docRef.id, "teamMembers"), {
            name: user.displayName,
            email: user.email,
          });
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
    </>
  );
}
