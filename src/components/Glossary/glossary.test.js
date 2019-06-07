import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Glossary from "./glossary";

configure({ adapter: new Adapter() });

describe("Glossary", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Glossary />);
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
