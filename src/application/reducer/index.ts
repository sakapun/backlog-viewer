import { BacklogSetting, initialState as backlogSetting } from "../../domain/BacklogSetting";
import { Issue } from "../../domain/issue";
import { Project } from "../../domain/project";

export const defaultState = {
  backlogSetting,
  projects: [] as Project[],
  customFieldIds: [] as number[],
  issues: [] as Issue[],
  selectedProjectId: 0,
  isSettingPage: true,
  effectCustomFieldName: "効果",
};

export type State = typeof defaultState;

export type Action =
  | { type: "FINISH_SETTING" }
  | { type: "SET_BACKLOG"; payload: BacklogSetting }
  | { type: "CLEAR_BACKLOG" }
  | { type: "UPDATE_BACKLOG_API_KEY"; payload: string }
  | { type: "UPDATE_SELECTED_PROJECT_ID"; payload: number }
  | { type: "CONCAT_PROJECTS"; payload: Project[] }
  | { type: "SET_CUSTOM_FIELD_IDS"; payload: number[] }
  | { type: "SET_ISSUES"; payload: Issue[] }
  | { type: "UPDATE_EFFECT_CUSTOM_FIELD_NAME"; payload: string };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FINISH_SETTING":
      return {
        ...state,
        isSettingPage: false,
      };
    case "CLEAR_BACKLOG":
      return {
        ...state,
        backlogSetting: {
          apiKey: "",
          spacePostfix: ".backlog.jp",
          spaceId: "",
        },
        isSettingPage: true,
      };
    case "SET_BACKLOG":
      return {
        ...state,
        backlogSetting: action.payload,
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
    case "UPDATE_EFFECT_CUSTOM_FIELD_NAME":
      return {
        ...state,
        effectCustomFieldName: action.payload,
      };
    default:
      return state;
  }
};
