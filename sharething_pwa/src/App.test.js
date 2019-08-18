import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import * as ROUTES from "./Constants/Routes";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



describe("Import", () => {
  it("should not be NULL", () => {
    expect(ROUTES.HOME).not.toBeNull();
    expect(ROUTES.LANDING).not.toBeNull();
  });
});
