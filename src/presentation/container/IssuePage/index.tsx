import { Box, Input } from "@smooth-ui/core-em";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useGlobalState } from "../../../application/provider";
import { createInstanceOfBacklogApi } from "../../../domain/BacklogSetting";
import { CustomeFieldResponse, CustomFieldOriginalResponse } from "../../../domain/CustomField";
import { buildIssueValues, OriginalIssueType } from "../../../domain/issue";
import { buildSelectProps, Project } from "../../../domain/project";
import { Button } from "../../component/Button";
import { IssueTableContainer } from "../IssueTable";
import { ContentOuter, SidebarContent, SidebarOuter } from "./element";

export type HooksType = {
  projects: Project[];
  projectHasCustomFields: number[];
  loadIssues: (projectId: number) => void;
  selectedProjectId: number;
  effectCustomFieldName: string;
  handleEffectCustomFieldName: (s: string) => void;
};

export const Hooks = ({
  projects,
  projectHasCustomFields,
  loadIssues,
  selectedProjectId,
  effectCustomFieldName,
  handleEffectCustomFieldName,
}: HooksType) => {
  const [fieldName, updateFieldName] = useState(effectCustomFieldName);

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

  const handleUpdateFieldName = useCallback((ev: any) => updateFieldName(ev.target.value), []);
  const handleEnterFieldName = useCallback(() => handleEffectCustomFieldName(fieldName), [fieldName]);

  const filteredProjects = projects.filter((p) => projectHasCustomFields.includes(p.id));
  return (
    <>
      <SidebarOuter>
        <SidebarContent>
          <Box mb={4}>
            <div>
              <span>プロジェクトを選択してください</span>
            </div>
            <Select options={buildSelectProps(filteredProjects)} onChange={changeHook} />
          </Box>
          <Box mb={4}>
            <div>データの更新</div>
            <Button onClick={reloadIssues} width={1}>
              更新
            </Button>
          </Box>
          <Box>
            <div>対象カスタムフィールド名</div>
            <Box display={"flex"}>
              <Input value={fieldName} onChange={handleUpdateFieldName} width={0.65} mr={2} />
              <Button onClick={handleEnterFieldName} width={0.3}>
                設定
              </Button>
            </Box>
          </Box>
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
  const backlogSetting = useGlobalState("backlogSetting");
  const effectCustomFieldName = useGlobalState("effectCustomFieldName");

  const backlogApi = createInstanceOfBacklogApi(backlogSetting);

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
        .filter((item) => item.name === effectCustomFieldName)
        .map((item) => item.projectId);
      dispatch({ type: "SET_CUSTOM_FIELD_IDS", payload: cfids });
    })();
  }, [effectCustomFieldName]);

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
        dispatch({ type: "SET_ISSUES", payload: buildIssueValues(issues, effectCustomFieldName) });
      });
  };

  const handleEffectCustomFieldName = useCallback(
    (value: string) => dispatch({ type: "UPDATE_EFFECT_CUSTOM_FIELD_NAME", payload: value }),
    [],
  );

  return (
    <Hooks
      projects={projects}
      projectHasCustomFields={customFieldIds}
      effectCustomFieldName={effectCustomFieldName}
      loadIssues={loadIssues}
      selectedProjectId={selectedProjectId}
      handleEffectCustomFieldName={handleEffectCustomFieldName}
    />
  );
};
