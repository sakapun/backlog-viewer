import { Issue } from "../../domain/issue";
import { Project } from "../../domain/project";
import { initialState as backlogSetting } from "./backlogSetting";

export const defaultState = {
  ok: true,
  backlogSetting,
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

export const reducer = (state: State, action: Action): State => {
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
        backlogSetting: {
          ...state.backlogSetting,
          editState: {
            ...state.backlogSetting.editState,
            apiKey: action.payload,
          },
        },
      };
    case "SET_BACKLOG":
      return {
        ...state,
        backlogSetting: {
          ...state.backlogSetting,
          origin: state.backlogSetting.editState,
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
