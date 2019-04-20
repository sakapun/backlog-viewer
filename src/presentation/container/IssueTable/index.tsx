import React from "react";
import ReactDataGrid from "react-data-grid";
import AutoSizer from "react-virtualized-auto-sizer";
import { useGlobalState } from "../../../application/provider";
import { buildDataGridRows, Issue, sortIssue } from "../../../domain/issue";
import { NumberFormatter } from "../../component/NumberFormatter";

export const IssueTableContainer = () => {
  const issues = useGlobalState("issues");
  return <IssueTable issues={issues} />;
};

export const IssueTable = ({ issues }: { issues: Issue[] }) => {
  const columns = [
    {
      key: "issueKey",
      name: "ID",
      editable: false,
      sortable: true,
      width: 110,
      sortDescendingFirst: false,
      formatter: IssueKeyFormatter,
    },
    { key: "title", name: "Title", editable: false, sortable: true },
    { key: "priorityScore", name: "優先度スコア", editable: false, width: 110, formatter: NumberFormatter },
    { key: "power", name: "効果", editable: false, width: 110, formatter: NumberFormatter },
    { key: "priorityValue", name: "優先度３段階", editable: false, width: 110, formatter: NumberFormatter },
    { key: "estimatedHours", name: "見積時間", editable: false, width: 110, formatter: NumberFormatter },
    { key: "hoursRatio", name: "コスト比率", editable: false, width: 110, formatter: NumberFormatter },
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
          onGridSort={(sortColumn, sortDirection) => console.log(sortColumn, sortDirection)}
          rowGetter={(i: number) => rows[i]}
        />
      )}
    </AutoSizer>
  );
};

const IssueKeyFormatter = ({ value }: { value: string }) => {
  return (
    <a href={"https://vegetalia.backlog.jp/view/" + value} target={"_blank"}>
      {value}
    </a>
  );
};
