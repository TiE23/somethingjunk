import supertest from "supertest";

import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { loginInput, sessionPayload, userInput, userPayload } from "./testResources";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer();

/**
 * Please note that instances of using ts-ignore comes from absolute necessity,
 * otherwise we'd need to mock dozens of additional object properties, and that's
 * just not going to be done.
 */
describe("user", () => {
  describe("create user", () => {
    describe("given email, name, and password are provided", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        await supertest(app)
          .post("/api/users")
          .send(userInput)
          .expect(200)
          .then(res => expect(res.body).toEqual(userPayload));

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the password confirmation doesn't match", () => {
      it("should return a 400 status", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        await supertest(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "doesnotmatch" })
          .expect(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 status", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce("Mock failure!");

        await supertest(app)
          .post("/api/users")
          .send(userInput)
          .expect(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });

  });

  describe("create user session", () => {
    describe("given the email and password are valid", () => {
      it("should return the user payload", async () => {
        jest.spyOn(UserService, "validatePassword")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        jest.spyOn(SessionService, "createSession")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(sessionPayload);

        const req = {
          body: loginInput,
          get: () => "a user agent",
        };

        const send =jest.fn();
        const res = { send };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
