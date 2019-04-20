import { act } from "react-dom/test-utils";
import { Issue } from "../../domain/issue";
import { Project } from "../../domain/project";
import { initialState as backlogState } from "./backlog";

export const defaultState = {
  ok: true,
  backlogState,
  projects: [] as Project[],
  customFieldIds: [] as number[],
  issues: [] as Issue[],
  selectedProjectId: 0,
};

export type State = typeof defaultState;

export type Action =
  | { type: "no" }
  | { type: "yes" }
  | { type: "SET_BACKLOG" }
  | { type: "UPDATE_BACKLOG_API_KEY"; payload: string }
  | { type: "UPDATE_SELECTED_PROJECT_ID"; payload: number }
  | { type: "CONCAT_PROJECTS"; payload: Project[] }
  | { type: "SET_CUSTOM_FIELD_IDS"; payload: number[] }
  | { type: "SET_ISSUES"; payload: Issue[] };

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
    case "CONCAT_PROJECTS":
      return {
        ...state,
        projects: state.projects.concat(action.payload),
      };
    case "SET_CUSTOM_FIELD_IDS":
      return {
        ...state,
        customFieldIds: action.payload,
      };
    case "SET_ISSUES":
      return {
        ...state,
        issues: action.payload,
      };
    case "UPDATE_SELECTED_PROJECT_ID":
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    default:
      return state;
  }
};
