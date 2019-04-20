import React, { Component } from "react";
import "./App.css";
import { Provider } from "./application/";
import { IndexPage } from "./presentation/container/IndexPage";

class App extends Component {
  render() {
    return (
      <Provider>
        <IndexPage />
      </Provider>
    );
  }
}

export default App;
