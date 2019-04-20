import { initialState as backlogState } from "./backlog";

export const defaultState = {
  ok: true,
  backlogState,
};

export type State = typeof defaultState;

export type Action = { type: "no" } | { type: "yes" } | { type: "SET_BACKLOG" } | { type: "UPDATE_BACKLOG_API_KEY"; payload: string };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "no":
      return {
        ...state,
        ok: false,
      };
    case "yes":
      return {
        ...state,
        ok: true,
      };
    case "UPDATE_BACKLOG_API_KEY":
      return {
        ...state,
        backlogState: {
          ...state.backlogState,
          editState: {
            ...state.backlogState.editState,
            apiKey: action.payload,
          },
        },
      };
    case "SET_BACKLOG":
      return {
        ...state,
        backlogState: {
          ...state.backlogState,
          origin: state.backlogState.editState,
        },
      };
    default:
      return state;
  }
};