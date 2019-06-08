import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { getRandomPassword } from "./firebase";

configure({ adapter: new Adapter() });

it("getRandomPassword returns a string of 12 characters", () => {
  const pw = getRandomPassword();
  expect(typeof pw).toBe("string");
  expect(pw).toHaveLength(12);
});

it("two calls to getRandomPassword return different values", () => {
  const pw = getRandomPassword();
  const pw2 = getRandomPassword();
  expect(pw).not.toBe(pw2);
});
