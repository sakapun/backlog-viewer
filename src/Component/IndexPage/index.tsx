import React from "react";
import ReactDataGrid from "react-data-grid";
import Select from "react-select";
import AutoSizer from "react-virtualized-auto-sizer";
import { CustomeFieldResponse, CustomFieldOriginalResponse } from "../../domain/CustomField";
import { buildDataGridRows, buildIssueValues, Issue, OriginalIssueType, sortIssue } from "../../domain/issue";
import { buildSelectProps, Project } from "../../domain/project";
import { backlogApi } from "../../lib/backlog-settings";
import { Button } from "../Button";
import { NumberFormatter } from "../NumberFormatter";
import { AppOuter, ContentOuter, ControlArea, HeaderOuter, MainOuter, SidebarContent, SidebarOuter } from "./element";

type IndexStateTypes = {
  projects: Project[];
  issues: Issue[];
  selectedProjectId: null | number;
  isFiltered: boolean;
  projectHasCustomFields: number[];
};

export class IndexPage extends React.Component<any, IndexStateTypes, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      selectedProjectId: null,
      isFiltered: false,
      projectHasCustomFields: [],
    };
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const projects = this.state.projects.filter((p) => this.state.projectHasCustomFields.includes(p.id));
    return (
      <AppOuter>
        <HeaderOuter>header</HeaderOuter>
        <MainOuter>
          <SidebarOuter>
            <SidebarContent>
              <ControlArea>
                プロジェクトを選択してください
                <Select options={buildSelectProps(projects)} onChange={this.handleChangeProject} />
                <Button onClick={this.onClickReload}>再読込</Button>
              </ControlArea>
            </SidebarContent>
          </SidebarOuter>
          <ContentOuter>
            <AutoSizer>{({ width, height }) => this.renderGrid(width, height)}</AutoSizer>
          </ContentOuter>
        </MainOuter>
      </AppOuter>
    );
  }
  async componentDidMount() {
    const projects = await backlogApi.getProjects();
    this.setState({ projects });

    // カスタムフィールドで効果という項目があるののみ絞り込む
    const customFields: CustomeFieldResponse[][] = await Promise.all(
      this.state.projects.map((project) => {
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
    this.setState({ projectHasCustomFields: cfids });
  }

  handleChangeProject = (event: any) => {
    this.setState({ selectedProjectId: event.value });
    this.loadIssues(event.value);
  };

  renderGrid = (width: number, height: number) => {
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

    const rows = buildDataGridRows(sortIssue(this.state.issues));
    return (
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
    );
  };

  loadIssues = (id: number) => {
    backlogApi
      .getIssues({
        projectId: [id],
        statusId: [1, 2],
        keyword: "",
        count: 100,
      })
      .then((issues: OriginalIssueType[]) => {
        this.setState({
          issues: buildIssueValues(issues),
        });
      });
  };

  onClickReload = () => {
    if (this.state.selectedProjectId !== null) {
      this.loadIssues(this.state.selectedProjectId);
    }
  };

  onToggleFilter = async () => {
    this.setState({ isFiltered: !this.state.isFiltered });
  };
}

const IssueKeyFormatter = ({ value }: { value: string }) => {
  return (
    <a href={"https://vegetalia.backlog.jp/view/" + value} target={"_blank"}>
      {value}
    </a>
  );
};
