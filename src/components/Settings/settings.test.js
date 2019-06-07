import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Settings from "./settings";

configure({ adapter: new Adapter() });

describe("Settings", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Settings />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
