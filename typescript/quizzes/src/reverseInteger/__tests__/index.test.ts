import {
  stringManip,
  numberManip1,
  // numberManip2,
} from "../index";

describe("Reverse Integer", () => {
  describe("stringManip", () => {
    it("should work with 1", () => {
      expect(stringManip(1)).toBe(1);
    });
    it("should work with 123", () => {
      expect(stringManip(123)).toBe(321);
    });
    it("should work with -123", () => {
      expect(stringManip(-123)).toBe(-321);
    });
    it("should work with 120", () => {
      expect(stringManip(120)).toBe(21);
    });
    it("should work with 1200", () => {
      expect(stringManip(1200)).toBe(21);
    });
    it("should work with 1534236469", () => {
      expect(stringManip(1534236469)).toBe(0);
    });
  });

  describe("numberManip1", () => {
    it("should work with 1", () => {
      expect(numberManip1(1)).toBe(1);
    });
    it("should work with 123", () => {
      expect(numberManip1(123)).toBe(321);
    });
    it("should work with -123", () => {
      expect(numberManip1(-123)).toBe(-321);
    });
    it("should work with 120", () => {
      expect(numberManip1(120)).toBe(21);
    });
    it("should work with 1200", () => {
      expect(numberManip1(1200)).toBe(21);
    });
    it("should work with 1534236469", () => {
      expect(numberManip1(1534236469)).toBe(0);
    });
  });
  // describe("numberManip2", () => {
  //   it("should work with 1", () => {
  //     expect(numberManip2(1)).toBe(1);
  //   });
  //   it("should work with 123", () => {
  //     expect(numberManip2(123)).toBe(321);
  //   });
  //   it("should work with -123", () => {
  //     expect(numberManip2(-123)).toBe(-321);
  //   });
  //   it("should work with 120", () => {
  //     expect(numberManip2(120)).toBe(21);
  //   });
  //   it("should work with 1200", () => {
  //     expect(numberManip2(1200)).toBe(21);
  //   });
  //   it("should work with 1534236469", () => {
  //     expect(numberManip2(1534236469)).toBe(0);
  //   });
  // });
});
