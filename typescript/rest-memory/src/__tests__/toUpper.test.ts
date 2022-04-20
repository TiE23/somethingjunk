import supertest from "supertest";

import createServer from "../utils/server";

const app = createServer();

describe("GET /api/toupper", () => {
  describe("given good input", () => {
    it("should return capitalized output", async () => {
      const payload = {
        input: "Hello world!",
        output: "HELLO WORLD!",
      };

      await supertest(app)
        .get("/api/toupper")
        .send({ input: payload.input })
        .expect(200)
        .then(res => expect(res.body).toEqual(payload));
    });
  });
  describe("given bad input", () => {
    it("should return an error", async () => {
      await supertest(app)
        .get("/api/toupper")
        .send({ blah: "blah" })
        .expect(400);
    });
  });
});
