import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";

import { ModalDemo } from "./Modal";
class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <ModalDemo />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
