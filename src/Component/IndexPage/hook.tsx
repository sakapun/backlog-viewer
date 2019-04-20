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
};

export const Hooks = ({ projects, projectHasCustomFields }: HooksType) => {
  const [a, seta] = useState<number>(1);
  const [b, setb] = useState<number>(1);
  useEffect(() => console.log(123), [a]);
  const countUp = useCallback(() => seta((prev) => prev + 1), [seta]);
  const countDown = useCallback(() => setb((prev) => prev - 1), [setb]);
  return (
    <>
      <SidebarOuter>
        <SidebarContent>
          <ControlArea>
            <Select options={buildSelectProps(projects)} />
          </ControlArea>
          <button onClick={countUp}>up: {a}</button>
          <button onClick={countDown}>up: {b}</button>
        </SidebarContent>
      </SidebarOuter>
      <ContentOuter>
        <pre>{projectHasCustomFields.toString()}{projects.toString()}</pre>
      </ContentOuter>
    </>
  );
};

export const HooksContainerz = () => {
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

  const projects = useGlobalState("projects");
  const customFieldIds = useGlobalState("customFieldIds");

  return <Hooks projects={projects} projectHasCustomFields={customFieldIds} />;
};
