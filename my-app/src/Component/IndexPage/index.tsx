import React from "react";
import {backlogApi} from "../../lib/backlog-settings";
import Select from "react-select";

type IndexStateTypes = {
  projects: object[];
  issues: object[];
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
        {this.state.issues.map((p: any) => {
          return <pre>{p.summary}</pre>;
        })}
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
    }).then((issues) => this.setState({
      issues
    }))
  }
}
