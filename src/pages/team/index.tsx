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
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { reducer, initialState } from "./reducer";
import { getActions } from "./actions";
import { CreateTeamInputs, JoinTeamInputs } from "./types";
import Title from "src/components/title";
import { AuthContext } from "src/components/auth/AuthContext";
import pages from "src/data/DashboardButtonData.json";

import type { User } from "@firebase/auth";
import axios from "axios";
import PageHeaders from "src/components/headers";
import BackButton from "src/components/backbutton";

export default function Team() {
  const history = useHistory();

  const joinTeamForm = useForm<JoinTeamInputs>();
  const createTeamForm = useForm<CreateTeamInputs>();

  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    createTeam,
    loadCurrentTeam,
    deleteCurrentTeam,
    closeMessageDialog,
    joinTeam,
    showJoinTeamDialog,
    closeJoinTeamDialog,
    showCreateTeamDialog,
    closeCreateTeamDialog,
  } = getActions(dispatch);

  useEffect(() => {
    if (user && user != "loading") {
      axios.get(`https://${process.env.REACT_APP_DISCORD_BOT_BASE}`);
      loadCurrentTeam(user);
    }
  }, [user]);

  return (
    <>
      <PageHeaders title={pages.pageItems[7].name} />
      <BackButton />
      <Title
        title={pages.pageItems[7].name}
        description={pages.pageItems[7].description}
      ></Title>
      <Box m={2}>
        <Card>
          <CardContent>
            <Box width="100%">
              <Grid container>
                {state.team ? (
                  <>
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>
                          Team name: {state.team.teamName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>Team ID: {state.team.teamId}</Typography>
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
                          Team members:{" "}
                          {state.team.teamMembers
                            .map((tm) => `${tm.name} <${tm.email}>`)
                            .join(", ")}
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
                          onClick={() => deleteCurrentTeam(user as User)}
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
                          onClick={showCreateTeamDialog}
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
                          onClick={showJoinTeamDialog}
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

      {/* Create Team Dialog */}
      <Dialog
        open={state.createTeamDialog.open}
        onClose={closeCreateTeamDialog}
        fullWidth
      >
        <DialogTitle>Create a team</DialogTitle>
        <DialogContent>
          <Controller
            name={"teamName"}
            control={createTeamForm.control}
            defaultValue={""}
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <TextField
                error={invalid}
                margin="dense"
                label="Team Name"
                helperText={error?.message}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateTeamDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={createTeamForm.handleSubmit(({ teamName }) =>
              createTeam(user as User, teamName, createTeamForm.setError)
            )}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Team Dialog */}
      <Dialog
        open={state.joinTeamDialog.open}
        onClose={closeJoinTeamDialog}
        fullWidth
      >
        <DialogTitle>Join a team</DialogTitle>
        <DialogContent>
          <Controller
            name={"teamId"}
            control={joinTeamForm.control}
            defaultValue={""}
            render={({
              field: { onChange, value },
              fieldState: { invalid, error },
            }) => (
              <TextField
                error={invalid}
                margin="dense"
                label="Team ID"
                helperText={error?.message}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJoinTeamDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={joinTeamForm.handleSubmit(({ teamId }) =>
              joinTeam(user as User, teamId, joinTeamForm.setError)
            )}
            color="primary"
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message dialog */}
      <Dialog
        open={state.messageDialog.open}
        onClose={closeMessageDialog}
        color={state.messageDialog.color}
      >
        <Box m={3} mb={0}>
          <Typography>{state.messageDialog.text}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" m={1}>
          <IconButton>
            <CloseIcon aria-label="close" onClick={closeMessageDialog} />
          </IconButton>
        </Box>
      </Dialog>

      {/* Discord dialog */}
      <Dialog
        open={!state.isDiscordLinked}
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

      {/* Discord server dialog */}
      <Dialog
        open={!state.isOnDiscordServer}
        onClose={() => {
          history.push("/dashboard/home");
        }}
      >
        <Box m={3}>
          <Typography>Join the server before creating a team!</Typography>
        </Box>
      </Dialog>
    </>
  );
}
