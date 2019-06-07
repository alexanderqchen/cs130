import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Courtroom from "./courtroom";

configure({ adapter: new Adapter() });

jest.mock("./courtroom");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Courtroom.mockClear();
});

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
