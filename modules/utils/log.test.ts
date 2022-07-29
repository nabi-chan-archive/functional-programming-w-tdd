import { log } from "./log";

describe("logger", () => {
  it("show logging", () => {
    const TEST_KEY = "KEY";
    const TEST_VALUE = "TEST";
    expect(log(TEST_KEY)(TEST_VALUE)).toStrictEqual(TEST_VALUE);
  });
});
