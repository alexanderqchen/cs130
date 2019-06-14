import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Landing from "./landing";

configure({ adapter: new Adapter() });

describe("Landing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
