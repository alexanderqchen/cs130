import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Admin from "./admin";

configure({ adapter: new Adapter() });

describe("Admin", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Admin />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("is a withRouter", () => {
    expect(wrapper.exists("withRouter()")).toBe(true);
  });
});
