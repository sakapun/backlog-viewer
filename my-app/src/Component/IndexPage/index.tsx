import React from "react";
import {backlogApi} from "../../lib/backlog-settings";
import Select from "react-select";
import ReactDataGrid from "react-data-grid";
import {
  buildDataGridRows,
  buildIssueValues,
  Issue,
  OriginalIssueType,
  sortIssue
} from "../../domain/issue";
import {NumberFormatter} from "../NumberFormatter";

type IndexStateTypes = {
  projects: object[];
  issues: Issue[];
}

export class IndexPage extends React.Component<any, IndexStateTypes, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      projects: [],
      issues: [],
    };
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const optionsForProjects = this.state.projects.map((p: any) => ({
      value: p.id,
      label: p.name
    }));
    return (
      <div>
        <Select options={optionsForProjects} onChange={this.handleChangeProject} />
        {this.renderGrid()}
      </div>
    );
  }
  componentDidMount(): void {
    backlogApi.getProjects().then(r => this.setState({projects: r}));
  }

  handleChangeProject = (event: any) => {
    backlogApi.getIssues({
      projectId: [event.value],
      statusId: [1, 2],
      keyword: "",
      count: 100,
    }).then((issues: OriginalIssueType[]) => {
      this.setState({
        issues: buildIssueValues(issues),
      })
    })
  }

  renderGrid = () => {
    const columns = [
      { key: "issueKey", name: "ID", editable: false, sortable: true, width: 110, sortDescendingFirst: false, formatter: IssueKeyFormatter },
      { key: "title", name: "Title", editable: false, sortable: true },
      { key: "priorityScore", name: "優先度スコア", editable: false, width: 110, formatter: NumberFormatter },
      { key: "power", name: "効果", editable: false, width: 110, formatter: NumberFormatter },
      { key: "priorityValue", name: "優先度３段階", editable: false, width: 110, formatter: NumberFormatter },
      { key: "estimatedHours", name: "見積時間", editable: false, width: 110, formatter: NumberFormatter },
      { key: "hoursRatio", name: "コスト比率", editable: false, width: 110, formatter: NumberFormatter },

    ];

    const rows = buildDataGridRows(sortIssue(this.state.issues));
    return <ReactDataGrid
      sortColumn={"issueKey"}
      minHeight={900}
      enableCellSelect={true}
      columns={columns}
      rowsCount={rows.length}
      onGridSort={(sortColumn, sortDirection) => console.log(sortColumn, sortDirection)}
      rowGetter={(i: number) => rows[i] }/>;
  };
}

const IssueKeyFormatter = ({value}: {value: string}) => {
  return <a href={"https://vegetalia.backlog.jp/view/" + value} target={"_blank"}>{value}</a>;
};
