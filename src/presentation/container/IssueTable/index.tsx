import React from "react";
import ReactDataGrid from "react-data-grid";
import AutoSizer from "react-virtualized-auto-sizer";
import { useGlobalState } from "../../../application/provider";
import { buildDataGridRows, Issue, sortIssue } from "../../../domain/Issue";
import { issueKeyFormatCreator, numberFormatter } from "./TableFormatter";

export const IssueTableContainer = () => {
  const issues = useGlobalState("issues");
  const backlogSetting = useGlobalState("backlogSetting");

  return <IssueTable issues={issues} hostDomain={backlogSetting.spaceId + backlogSetting.spacePostfix} />;
};

export type IssueTableType = {
  issues: Issue[];
  hostDomain: string;
};
export const IssueTable = ({ issues, hostDomain }: IssueTableType) => {
  const columns = [
    {
      key: "issueKey",
      name: "ID",
      editable: false,
      sortable: true,
      width: 110,
      sortDescendingFirst: false,
      formatter: issueKeyFormatCreator(hostDomain),
    },
    { key: "title", name: "Title", editable: false, sortable: true },
    { key: "priorityScore", name: "優先度スコア", editable: false, width: 110, formatter: numberFormatter },
    { key: "power", name: "効果", editable: false, width: 110, formatter: numberFormatter },
    { key: "priorityValue", name: "優先度３段階", editable: false, width: 110, formatter: numberFormatter },
    { key: "estimatedHours", name: "見積時間", editable: false, width: 110, formatter: numberFormatter },
    { key: "hoursRatio", name: "コスト比率", editable: false, width: 110, formatter: numberFormatter },
  ];

  const rows = buildDataGridRows(sortIssue(issues));
  return (
    <AutoSizer>
      {({ width, height }) => (
        <ReactDataGrid
          sortColumn={"issueKey"}
          minWidth={width - 2}
          minHeight={height}
          enableCellSelect={true}
          columns={columns}
          rowsCount={rows.length}
          rowGetter={(i: number) => rows[i]}
        />
      )}
    </AutoSizer>
  );
};
