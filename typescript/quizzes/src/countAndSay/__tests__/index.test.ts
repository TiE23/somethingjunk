import { countAndSay } from "../index";

describe("Count and Say", () => {
  it("should work for 1", () => {
    expect(countAndSay(1)).toBe("1");
  });
  it("should work for 2", () => {
    expect(countAndSay(2)).toBe("11");
  });
  it("should work for 3", () => {
    expect(countAndSay(3)).toBe("21");
  });
  it("should work for 4", () => {
    expect(countAndSay(4)).toBe("1211");
  });
  it("should work for 5", () => {
    expect(countAndSay(5)).toBe("111221");
  });
  it("should work for 5", () => {
    expect(countAndSay(6)).toBe("312211");
  });
});
