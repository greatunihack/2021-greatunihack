import { Dispatch } from "react";
import type { UseFormSetError } from "react-hook-form";

import {
  TeamDispatchActions,
  TeamActions,
  TeamDispatchActionType,
  JoinTeamInputs,
  CreateTeamInputs,
} from "./types";

import Filter from "bad-words";

import type { User } from "@firebase/auth";

import {
  getTeamWithMembers,
  getUserDoc,
  joinUserToTeam,
  removeUserFromTeam,
  createTeam as createTeamForUser,
  TeamFullError,
  TeamNotExistsError,
  TeamNameTakenError,
  getDiscordServerStatus,
} from "src/data/accessors";

export function getActions(
  dispatch: Dispatch<TeamDispatchActions>
): TeamActions {
  const loadCurrentTeam = async ({ email }: User) => {
    try {
      const userDoc = await getUserDoc(email as string);
      const user = userDoc.data();

      if (!user.discordId) {
        dispatch({ type: TeamDispatchActionType.SetDiscordNotLinked });
        return;
      }
      const isOnServer = await getDiscordServerStatus(user.discordId);
      if (!isOnServer) {
        dispatch({ type: TeamDispatchActionType.SetNotOnDiscordServer });
        return;
      }

      if (!user.teamId) return;

      const team = await getTeamWithMembers(user.teamId);

      dispatch({
        type: TeamDispatchActionType.Load,
        payload: { team },
      });
    } catch (err) {
      showErrorMessage("Internal error, please try again in a bit!");
      console.log(err);
    }
  };

  const deleteCurrentTeam = async (user: User) => {
    try {
      const userDoc = await getUserDoc(user.email as string);
      const internalUser = userDoc.data();

      if (!internalUser.discordId) {
        dispatch({ type: TeamDispatchActionType.SetDiscordNotLinked });
        return;
      }

      if (!internalUser.teamId) return;

      removeUserFromTeam(user);

      showSuccessMessage("Left team successfully!");
      dispatch({ type: TeamDispatchActionType.Delete });
    } catch (err) {
      showErrorMessage("Internal error, please try again in a bit!");
      console.log(err);
    }
  };

  const joinTeam = async (
    user: User,
    teamId: string,
    setErrors: UseFormSetError<JoinTeamInputs>
  ) => {
    try {
      const userDoc = await getUserDoc(user.email as string);
      const internalUser = userDoc.data();

      if (!internalUser.discordId) {
        dispatch({ type: TeamDispatchActionType.SetDiscordNotLinked });
        return;
      }

      if (internalUser.teamId) return;

      const team = await getTeamWithMembers(teamId);

      await joinUserToTeam(user, team.teamId);

      dispatch({
        type: TeamDispatchActionType.Load,
        payload: {
          team: {
            ...team,
            teamMembers: [
              ...team.teamMembers,
              {
                name: user.displayName as string,
                email: user.email as string,
              },
            ],
          },
        },
      });
      closeJoinTeamDialog();
      showSuccessMessage(`Team joined successfully!`);
    } catch (err) {
      if (err instanceof TeamNotExistsError) {
        setErrors("teamId", {
          message: "Team not found!",
        });
      } else if (err instanceof TeamFullError) {
        setErrors("teamId", {
          message: "You can't have more than 6 people on the same team!",
        });
      } else {
        showErrorMessage("Internal error, please try again in a bit!");
        console.log(err);
      }
    }
  };

  const createTeam = async (
    user: User,
    teamName: string,
    setError: UseFormSetError<CreateTeamInputs>
  ) => {
    if (new Filter().isProfane(teamName)) {
      setError(
        "teamName",
        {
          message: "Team name is not allowed.",
        },
        {
          shouldFocus: true,
        }
      );
      return;
    }

    try {
      const team = await createTeamForUser(user, teamName);

      closeCreateTeamDialog();
      showSuccessMessage(
        `Team created successfully! Your team ID is: ${team.teamId}. You can share this with up to 5 people.`
      );
      dispatch({
        type: TeamDispatchActionType.Load,
        payload: {
          team,
        },
      });
    } catch (err) {
      if (err instanceof TeamNameTakenError) {
        setError("teamName", {
          message: "Team name is taken.",
        });
      } else {
        showErrorMessage("Internal error, please try again in a bit!");
        console.log(err);
      }
    }
  };

  const showMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "primary" },
    });
  };

  const showSuccessMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "success" },
    });
  };

  const showErrorMessage = (text: string) => {
    dispatch({
      type: TeamDispatchActionType.ShowMessage,
      payload: { text, color: "error" },
    });
  };

  const closeMessageDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseMessageDialog });
  };

  const showJoinTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.ShowJoinTeamDialog });
  };

  const closeJoinTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseJoinTeamDialog });
  };

  const showCreateTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.ShowCreateTeamDialog });
  };

  const closeCreateTeamDialog = () => {
    dispatch({ type: TeamDispatchActionType.CloseCreateTeamDialog });
  };

  return {
    loadCurrentTeam,
    deleteCurrentTeam,
    joinTeam,
    createTeam,
    showMessage,
    showSuccessMessage,
    showErrorMessage,
    closeMessageDialog,
    showJoinTeamDialog,
    closeJoinTeamDialog,
    showCreateTeamDialog,
    closeCreateTeamDialog,
  };
}
