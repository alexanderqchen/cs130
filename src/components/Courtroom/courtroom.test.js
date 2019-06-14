import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Courtroom from "./courtroom";

configure({ adapter: new Adapter() });

describe("Courtroom", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Courtroom />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
