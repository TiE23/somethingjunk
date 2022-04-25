import { urlShortener, createDB } from "../index";

describe("urlShortner", () => {
  const fakeDB = createDB();
  const helloWorld = "Hello World!";
  const introduction = "My name is Kyle Geib.";

  describe("given 'Hello World!' input", () => {

    it("should return 8 characters of hash", () => {
      expect(urlShortener(helloWorld, fakeDB, 8).length).toBe(8);
    });

    it("should have the Hello World! string in my fake DB", () => {
      expect(fakeDB.shortUrls[helloWorld]).toBeTruthy();
    });

    it("should return the correct first 8 hash characters", () => {
      expect(urlShortener(helloWorld, fakeDB, 8)).toBe("861844d6");
    });
    it("should return the correct first 6 hash characters", () => {
      expect(urlShortener(helloWorld, fakeDB, 6)).toBe("861844");
    });
  });

  describe("given introduction input", () => {

    it("should return 8 characters of hash", () => {
      expect(urlShortener(introduction, fakeDB, 8).length).toBe(8);
    });

    it("should have the introduction and hello world string in my fake DB", () => {
      expect(fakeDB.shortUrls[introduction]).toBeTruthy();
      expect(fakeDB.shortUrls[helloWorld]).toBeTruthy();
    });

    it("should return the correct first 8 hash characters", () => {
      expect(urlShortener(introduction, fakeDB, 8)).toBe("75f26455");
    });
    it("should return the correct first 6 hash characters", () => {
      expect(urlShortener(introduction, fakeDB, 6)).toBe("75f264");
    });


  });
});
