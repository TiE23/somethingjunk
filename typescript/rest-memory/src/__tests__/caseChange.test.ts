import supertest from "supertest";
import config from "config";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import createServer from "../utils/server";
import { ModeEnum as CaseChangeMode } from "../schema/caseChange.schema";
import * as CaseChangeService from "../service/caseChange.service";

const app = createServer();
const maxLength = config.get<number>("caseChangeMaxLength");

describe("caseChange", () => {
  describe("GET method", () => {
    describe("given mode set to lower", () => {
      it("should behave correctly with good input", async () => {
        await supertest(app)
            .get("/api/casechange/lower/Hello World!")
            .expect(200)
            .then(res => expect(res.body).toEqual({
              input: "Hello World!",
              output: "hello world!",
              mode: "lower",
            }));
      });
      it("should reject correctly with missing input", async () => {
        await supertest(app)
          .get("/api/casechange/lower")
          .expect(404);
      });
      it("should reject correctly with input that is too long", async () => {
        await supertest(app)
          .get(`/api/casechange/lower/${"Blah".repeat(maxLength / 4 + 1)}`)
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));
      });
    });
    describe("given mode set to upper", () => {
      it("should behave correctly with good input", async () => {
        await supertest(app)
          .get("/api/casechange/upper/Hello World!")
          .expect(200)
          .then(res => expect(res.body).toEqual({
            input: "Hello World!",
            output: "HELLO WORLD!",
            mode: "upper",
          }));
      });
      it("should reject correctly with missing input", async () => {
        await supertest(app)
          .get("/api/casechange/upper")
          .expect(404);
      });
      it("should reject correctly with input that is too long", async () => {
        await supertest(app)
          .get(`/api/casechange/upper/${"Blah".repeat(maxLength / 4 + 1)}`)
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));
      });
    });
  });

  describe("POST method (using MongoMemoryServer)", () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      // Not sure on the rationale between these two
      await mongoose.disconnect();
      await mongoose.connection.close();
    });

    describe("given mode set to lower", () => {
      it("should behave correctly with good input", async () => {
        await supertest(app)
          .post("/api/casechange/lower")
          .send({
            input: "Hello World!",
          })
          .expect(200)
          .then(res => {
            // expect(res.body.input).toEqual("Hello World!");
            // expect(res.body.output).toEqual("hello world!");
            // expect(res.body.mode).toEqual(CaseChangeMode.Lower);
            // Better method
            expect(res.body).toEqual({
              input: "Hello World!",
              output: "hello world!",
              mode: CaseChangeMode.Lower,
              __v: 0,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            });
          });
      });
      it("should reject correctly with missing input", async () => {
        await supertest(app)
          .post("/api/casechange/upper")
          .send({})
          .expect(400);
      });
      it("should reject correctly with input that is too long", async () => {
        await supertest(app)
          .post("/api/casechange/lower")
          .send({ input: "Blah".repeat(maxLength / 4 + 1) })
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));
      });
    });
    describe("given mode set to upper", () => {
      it("should behave correctly with good input", async () => {
        await supertest(app)
          .post("/api/casechange/upper")
          .send({
            input: "Hello World!",
          })
          .expect(200)
          .then(res => {
            expect(res.body).toEqual({
              input: "Hello World!",
              output: "HELLO WORLD!",
              mode: CaseChangeMode.Upper,
              __v: 0,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            });
          });
      });
      it("should reject correctly with missing input", async () => {
        await supertest(app)
          .post("/api/casechange/upper")
          .send({})
          .expect(400);
      });
      it("should reject correctly with input that is too long", async () => {
        await supertest(app)
          .post("/api/casechange/upper")
          .send({ input: "Blah".repeat(maxLength / 4 + 1) })
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));
      });
    });
  });

  describe("POST method (using mocks)", () => {
    describe("given mode set to upper", () => {
      it("should behave correctly with good input", async () => {
        const userInput = {
          input: "Hello World!",
          output: "HELLO WORLD!",
          mode: CaseChangeMode.Upper,
        };
        const response = caseChangeResponse(userInput);

        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(response);

        await supertest(app)
          .post("/api/casechange/upper")
          .send({ input: userInput.input })
          .expect(200)
          .then(res => expect(res.body).toEqual(response));

        expect(caseChangeSaveMock).toHaveBeenCalledWith(userInput);
      });
      it("should reject correctly with missing input", async () => {
        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce({});

        await supertest(app)
          .post("/api/casechange/upper")
          .send({})
          .expect(400);

        expect(caseChangeSaveMock).not.toHaveBeenCalled();
      });
      it("should reject correctly with input that is too long", async () => {
        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce({});
        await supertest(app)
          .post("/api/casechange/upper")
          .send({ input: "Blah".repeat(maxLength / 4 + 1) })
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));

        expect(caseChangeSaveMock).not.toHaveBeenCalled();
      });
    });
    describe("given mode set to lower", () => {
      it("should behave correctly with good input", async () => {
        const userInput = {
          input: "Hello World!",
          output: "hello world!",
          mode: CaseChangeMode.Lower,
        };
        const response = caseChangeResponse(userInput);

        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(response);

        await supertest(app)
          .post("/api/casechange/lower")
          .send({ input: userInput.input })
          .expect(200)
          .then(res => expect(res.body).toEqual(response));

        expect(caseChangeSaveMock).toHaveBeenCalledWith(userInput);
      });
      it("should reject correctly with missing input", async () => {
        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce({});

        await supertest(app)
          .post("/api/casechange/lower")
          .send({})
          .expect(400);

        expect(caseChangeSaveMock).not.toHaveBeenCalled();
      });
      it("should reject correctly with input that is too long", async () => {
        const caseChangeSaveMock = jest
          .spyOn(CaseChangeService, "caseChangeSave")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce({});
        await supertest(app)
          .post("/api/casechange/lower")
          .send({ input: "Blah".repeat(maxLength / 4 + 1) })
          .expect(400)
          .then(res => expect(res.body[0].message).toContain("at most"));

        expect(caseChangeSaveMock).not.toHaveBeenCalled();
      });
    });
  });
});


const saveId = new mongoose.Types.ObjectId().toString();
const caseChangeResponse = (payload: Record<string, unknown>) => ({
  ...payload,
  __v: 0,
  _id: saveId,
  createdAt: "2022-04-17T18:17:16.131Z",
  updatedAt: "2022-04-17T18:17:16.131Z",
});
