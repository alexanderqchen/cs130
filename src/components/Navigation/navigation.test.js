import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Navigation from "./navigation";

configure({ adapter: new Adapter() });

describe("Navigation", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains a AuthUserContext.Consumer", () => {
    expect(wrapper.children().find("ContextConsumer")).toHaveLength(1);
  });
});
