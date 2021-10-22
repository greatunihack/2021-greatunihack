import {
  TeamPageState,
  TeamDispatchActions,
  TeamDispatchActionType,
} from "./types";

export function reducer(
  state: TeamPageState,
  action: TeamDispatchActions
): TeamPageState {
  switch (action.type) {
    case TeamDispatchActionType.Load:
      return {
        ...state,
        team: action.payload.team,
      };
    case TeamDispatchActionType.Delete:
      return {
        ...state,
        team: undefined,
      };
    case TeamDispatchActionType.ShowMessage: {
      return {
        ...state,
        messageDialog: {
          open: true,
          text: action.payload.text,
          color: action.payload.color,
        },
      };
    }
    case TeamDispatchActionType.CloseMessageDialog: {
      return {
        ...state,
        messageDialog: {
          open: false,
          text: state.messageDialog.text,
          color: "primary",
        },
      };
    }
    case TeamDispatchActionType.ShowJoinTeamDialog: {
      return {
        ...state,
        joinTeamDialog: {
          open: true,
        },
      };
    }
    case TeamDispatchActionType.CloseJoinTeamDialog: {
      return {
        ...state,
        joinTeamDialog: {
          open: false,
        },
      };
    }
    case TeamDispatchActionType.ShowCreateTeamDialog: {
      return {
        ...state,
        createTeamDialog: {
          open: true,
        },
      };
    }
    case TeamDispatchActionType.CloseCreateTeamDialog: {
      return {
        ...state,
        createTeamDialog: {
          open: false,
        },
      };
    }
    case TeamDispatchActionType.SetDiscordNotLinked: {
      return {
        ...state,
        isDiscordLinked: false,
      };
    }
    case TeamDispatchActionType.SetNotOnDiscordServer: {
      return {
        ...state,
        isOnDiscordServer: false,
      };
    }
  }
}

export const initialState: TeamPageState = {
  team: undefined,
  messageDialog: {
    open: false,
    text: "",
    color: "primary",
  },
  joinTeamDialog: {
    open: false,
  },
  createTeamDialog: {
    open: false,
  },
  isDiscordLinked: true,
  isOnDiscordServer: true,
};
