import { eqNumber } from "/modules/functional";

describe("elemNumber 함수 테스트", () => {
  it("equal 1 === 1 to be true", () => {
    expect(eqNumber.equals(1, 1)).toBeTruthy();
  });
  it("equal 1 !== 2 to be false", () => {
    expect(eqNumber.equals(1, 2)).toBeFalsy();
  });
});
