import React from "react";
import {backlogApi} from "../../lib/backlog-settings";
import Select from "react-select";
import ReactDataGrid from "react-data-grid";
import {
  buildDataGridRows,
  buildIssueValues,
  Issue,
  issueHoursRatio,
  issueSorter,
  OriginalIssueType
} from "../../domain/issue";

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
      keyword: ""
    }).then((issues: OriginalIssueType[]) => {
      issueHoursRatio(this.state.issues)
      this.setState({
        issues: buildIssueValues(issues),
      })
    })
  }

  renderGrid = () => {
    const columns = [
      { key: "issueKey", name: "ID", editable: false, sortable: true, sortDescendingFirst: false, formatter: IssueKeyFormatter },
      { key: "title", name: "Title", editable: false, sortable: true },
      { key: "power", name: "効果", editable: false },
      { key: "hoursRatio", name: "コスト比率", editable: false },

    ];

    const rows = buildDataGridRows(this.state.issues.sort(issueSorter));
    return <ReactDataGrid
      sortColumn={"issueKey"}
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
