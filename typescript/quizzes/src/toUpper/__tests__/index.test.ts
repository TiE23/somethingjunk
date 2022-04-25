import { toUpper } from "../index";

describe("toUpper", () => {
  describe("given good inputs", () => {
    it("should capitalize the data", () => {
      expect(toUpper("Hello world!")).toEqual("HELLO WORLD!");
    });
  });
});
