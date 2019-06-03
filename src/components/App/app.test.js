import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./app";

configure({ adapter: new Adapter() });

describe("Application", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(App());
  });

  it("wrapper exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("is a Router", () => {
    expect(wrapper.exists("Router")).toBe(true);
  });

  it("contains two Routes", () => {
    expect(
      wrapper
        .children()
        .children()
        .find("Route")
    ).toHaveLength(2);
  });
});
