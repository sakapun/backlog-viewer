import React, { useCallback, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useGlobalState } from "../../../application/provider";
import { CustomeFieldResponse, CustomFieldOriginalResponse } from "../../../domain/CustomField";
import { buildIssueValues, OriginalIssueType } from "../../../domain/issue";
import { buildSelectProps, Project } from "../../../domain/project";
import { backlogApi } from "../../../lib/backlog-settings";
import { Button } from "../../component/Button";
import { IssueTableContainer } from "../IssueTable";
import { ContentOuter, ControlArea, SidebarContent, SidebarOuter } from "./element";

export type HooksType = {
  projects: Project[];
  projectHasCustomFields: number[];
  loadIssues: (projectId: number) => void;
  selectedProjectId: number;
};

export const Hooks = ({ projects, projectHasCustomFields, loadIssues, selectedProjectId }: HooksType) => {
  /**
   * プロジェクトを選択したときの関数
   */
  const changeHook = useCallback((ev: any) => {
    const projectId = ev.value;
    if (typeof projectId === "number") {
      loadIssues(projectId);
    }
  }, []);

  /**
   * 課題再読込
   */
  const reloadIssues = useCallback(() => loadIssues(selectedProjectId), [selectedProjectId]);

  const filteredProjects = projects.filter((p) => projectHasCustomFields.includes(p.id));
  return (
    <>
      <SidebarOuter>
        <SidebarContent>
          <ControlArea>
            <div>
              <span>プロジェクトを選択してください</span>
            </div>
            <Select options={buildSelectProps(filteredProjects)} onChange={changeHook} />
          </ControlArea>
          <ControlArea>
            <div>データの更新</div>
            <Button onClick={reloadIssues}>更新</Button>
          </ControlArea>
        </SidebarContent>
      </SidebarOuter>
      <ContentOuter>
        <IssueTableContainer />
      </ContentOuter>
    </>
  );
};

export const MainPageContainer = () => {
  // state
  const projects = useGlobalState("projects");
  const customFieldIds = useGlobalState("customFieldIds");
  const selectedProjectId = useGlobalState("selectedProjectId");

  const dispatch = useDispatch();
  // 初期化
  useEffect(() => {
    (async () => {
      const projects: Project[] = await backlogApi.getProjects();
      dispatch({ type: "CONCAT_PROJECTS", payload: projects });

      // カスタムフィールドで効果という項目があるののみ絞り込む
      const customFields: CustomeFieldResponse[][] = await Promise.all(
        projects.map((project) => {
          return backlogApi.getCustomFields("" + project.id).then((res: CustomFieldOriginalResponse[]) => {
            return res.map((r) => {
              return {
                ...r,
                projectId: project.id,
              };
            });
          });
        }),
      );
      const cfids = customFields
        .flat(1)
        .filter((item) => item.name === "効果")
        .map((item) => item.projectId);
      dispatch({ type: "SET_CUSTOM_FIELD_IDS", payload: cfids });
    })();
  }, []);

  // action
  const loadIssues = (projectId: number) => {
    dispatch({ type: "UPDATE_SELECTED_PROJECT_ID", payload: projectId });
    backlogApi
      .getIssues({
        projectId: [projectId],
        statusId: [1, 2],
        keyword: "",
        count: 100,
      })
      .then((issues: OriginalIssueType[]) => {
        dispatch({ type: "SET_ISSUES", payload: buildIssueValues(issues) });
      });
  };

  return (
    <Hooks projects={projects} projectHasCustomFields={customFieldIds} loadIssues={loadIssues} selectedProjectId={selectedProjectId} />
  );
};
