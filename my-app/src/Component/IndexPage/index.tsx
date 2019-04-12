import React from "react";
import axios from "axios";
import {backlogApi} from "../../lib/backlog-settings";


export class IndexPage extends React.Component {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div>あああ</div>;
  }
  componentDidMount(): void {
    backlogApi.getProjects().then(r => console.log(r));
    backlogApi.getIssues()
  }
}
