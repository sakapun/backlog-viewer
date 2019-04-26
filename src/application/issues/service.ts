// action
import { createInstanceOfBacklogApi } from "../../domain/BacklogSetting";
import { buildIssueValues, OriginalIssueType } from "../../domain/Issue";
import { useDispatch, useGlobalState } from "../provider";

export const loadIssues = () => {
  const dispatch = useDispatch();

  const selectedProjectId = useGlobalState("selectedProjectId");

  const backlogSetting = useGlobalState("backlogSetting");
  const effectCustomFieldName = useGlobalState("effectCustomFieldName");

  const backlogApi = createInstanceOfBacklogApi(backlogSetting);

  dispatch({ type: "UPDATE_SELECTED_PROJECT_ID", payload: selectedProjectId });
  backlogApi
    .getIssues({
      projectId: [selectedProjectId],
      statusId: [1, 2],
      keyword: "",
      count: 100,
    })
    .then((issues: OriginalIssueType[]) => {
      dispatch({ type: "SET_ISSUES", payload: buildIssueValues(issues, effectCustomFieldName) });
    });
};
