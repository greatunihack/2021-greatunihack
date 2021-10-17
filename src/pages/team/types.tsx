/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@firebase/auth";
import type { UseFormSetError } from "react-hook-form";
import { Team } from "src/data/models";

type ColorType = "primary" | "success" | "error";

export type JoinTeamInputs = {
  teamId: string;
};

export type CreateTeamInputs = {
  teamName: string;
};

export type TeamPageState = {
  team?: Team;
  messageDialog: {
    text: string;
    open: boolean;
    color: ColorType;
  };
  joinTeamDialog: {
    open: boolean;
  };
  createTeamDialog: {
    open: boolean;
  };
  isDiscordLinked: boolean;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum TeamDispatchActionType {
  Load = "LOAD_TEAM",
  Delete = "DELETE_TEAM",
  ShowMessage = "SHOW_MESSAGE",
  CloseMessageDialog = "CLOSE_MESSAGE_DIALOG",
  ShowJoinTeamDialog = "SHOW_LEAVE_TEAM_DIALOG",
  CloseJoinTeamDialog = "CLOSE_LEAVE_TEAM_DIALOG",
  ShowCreateTeamDialog = "SHOW_CREATE_TEAM_DIALOG",
  CloseCreateTeamDialog = "CLOSE_CRETE_TEAM_DIALOG",
  SetDiscordNotLinked = "SET_DISCORD_NOT_LINKED",
}

type TeamDispatchActionPayload = {
  [TeamDispatchActionType.Load]: {
    team?: Team;
  };
  [TeamDispatchActionType.ShowMessage]: {
    text: string;
    color: ColorType;
  };
  [TeamDispatchActionType.CloseMessageDialog]: undefined;
  [TeamDispatchActionType.ShowJoinTeamDialog]: undefined;
  [TeamDispatchActionType.CloseJoinTeamDialog]: undefined;
  [TeamDispatchActionType.ShowCreateTeamDialog]: undefined;
  [TeamDispatchActionType.CloseCreateTeamDialog]: undefined;
  [TeamDispatchActionType.SetDiscordNotLinked]: undefined;
  [TeamDispatchActionType.Delete]: undefined;
};

export type TeamDispatchActions =
  ActionMap<TeamDispatchActionPayload>[keyof TeamDispatchActionPayload];

export type TeamActions = {
  loadCurrentTeam: (user: User) => void;
  createTeam: (
    user: User,
    teamName: string,
    setError: UseFormSetError<CreateTeamInputs>
  ) => void;
  deleteCurrentTeam: (user: User) => void;
  joinTeam: (
    user: User,
    teamId: string,
    setError: UseFormSetError<JoinTeamInputs>
  ) => void;
  showMessage: (text: string) => void;
  showSuccessMessage: (text: string) => void;
  showErrorMessage: (text: string) => void;
  closeMessageDialog: () => void;
  showJoinTeamDialog: () => void;
  closeJoinTeamDialog: () => void;
  showCreateTeamDialog: () => void;
  closeCreateTeamDialog: () => void;
};
