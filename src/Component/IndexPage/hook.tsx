import React, { useCallback, useEffect, useState } from "react";
import ReactDataGrid from "react-data-grid";
import Select from "react-select";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDispatch, useGlobalState } from "../../application/provider";
import { CustomeFieldResponse, CustomFieldOriginalResponse } from "../../domain/CustomField";
import { buildDataGridRows, buildIssueValues, Issue, OriginalIssueType, sortIssue } from "../../domain/issue";
import { buildSelectProps, Project } from "../../domain/project";
import { backlogApi } from "../../lib/backlog-settings";
import { Button } from "../Button";
import { NumberFormatter } from "../NumberFormatter";
import { ContentOuter, ControlArea, SidebarContent, SidebarOuter } from "./element";

export type HooksType = {
  projects: Project[];
  projectHasCustomFields: number[];
  loadIssues: (projectId: number) => void;
  selectedProjectId: number;
};

export const Hooks = ({ projects, projectHasCustomFields, loadIssues, selectedProjectId }: HooksType) => {
  const [a, seta] = useState<number>(1);
  const [b, setb] = useState<number>(1);
  useEffect(() => console.log(123), [a]);
  const countUp = useCallback(() => seta((prev) => prev + 1), [seta]);
  const countDown = useCallback(() => setb((prev) => prev - 1), [setb]);

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

  return (
    <>
      <SidebarOuter>
        <SidebarContent>
          <ControlArea>
            <Select options={buildSelectProps(projects)} onChange={changeHook} />
          </ControlArea>
          <ControlArea>
            <div>データの更新</div>
            <Button onClick={reloadIssues}>更新</Button>
          </ControlArea>
          <button onClick={countUp}>up: {a}</button>
          <button onClick={countDown}>up: {b}</button>
        </SidebarContent>
      </SidebarOuter>
      <ContentOuter>
        <pre>
          {projectHasCustomFields.toString()}
          {projects.toString()}
        </pre>
      </ContentOuter>
    </>
  );
};

export const HooksContainerz = () => {
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
