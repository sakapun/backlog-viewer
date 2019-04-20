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
};

export const Hooks = ({ projects }: HooksType) => {
  const [a, seta] = useState<number>(1);
  const [b, setb] = useState<number>(1);
  useEffect(() => console.log(123), [a]);
  const countUp = useCallback(() => seta((prev) => prev + 1), [seta]);
  const countDown = useCallback(() => setb((prev) => prev - 1), [setb]);
  return (
    <>
      <SidebarOuter>
        <SidebarContent>
          <ControlArea>afasdf</ControlArea>
          <button onClick={countUp}>up: {a}</button>
          <button onClick={countDown}>up: {b}</button>
        </SidebarContent>
      </SidebarOuter>
      <ContentOuter>
        <pre>{projects.toString()}</pre>
      </ContentOuter>
    </>
  );
};

export const HooksContainerz = () => {
  const dispatch = useDispatch();
  const projects = useGlobalState("projects");

  // 初期化
  useEffect(() => {
    (async () => {
      const projects = await backlogApi.getProjects();
      dispatch({ type: "CONCAT_PROJECTS", payload: projects });
    })();
  }, []);
  return <Hooks projects={projects} />;
};
