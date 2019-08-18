import React from "react";
import { shallow } from "enzyme";
import HomeScreen from "./HomeScreen";

describe("HomeScreen component", () => {
    test("Displays title", () => {
      const wrapper = shallow(<HomeScreen />).dive();
      const text = wrapper.find('h1').text();
      expect(text).toEqual('Home Screen');
    });
  });