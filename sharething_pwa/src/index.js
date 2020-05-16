import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./App";
import './i18n';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Application />,
  document.getElementById("root")
);

serviceWorker.unregister();
