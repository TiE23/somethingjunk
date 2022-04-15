import supertest from "supertest";

import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import { userInput, userPayload } from "./testResources";

const app = createServer();

describe("user", () => {
  describe("create user", () => {
    describe("given email, name, and password are provided", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        await supertest(app).post("/api/users")
          .send(userInput)
          .expect(200)
          .then(res => expect(res.body).toEqual(userPayload));

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the password is incorrect", () => {
      it("should return a 400 status", () => {
        expect(true).toBe(true);
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 status", () => {
        expect(true).toBe(true);
      });
    });

  });

  describe("create user session", () => {
    describe("given the email and password are valid", () => {
      it("should return the user payload", () => {
        expect(true).toBe(true);
      });
    });
  });
});
