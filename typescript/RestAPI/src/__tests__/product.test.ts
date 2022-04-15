// supertest is a way to test our API.
import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { omit } from "lodash";

import createServer from "../utils/server";
import { createProduct } from "../service/product.service";
import { signJWT } from "../utils/jwt.utils";
import { userPayload, productPayload } from "./testResources";

const app = createServer();

/**
 * This test file uses an excessive step of generating a temporary MongoDB instance
 * using MongoMemoryServer. It does this instead of mocking. Which is pretty
 * hard core, to be honest.
 */
describe("product", () => {
  beforeAll(async () => {
    // This launches a temporary testing-only MongoDB. Which is kinda crazy.
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404 status", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);

        await supertest(app)
          .get(`/api/products/${product.productId}`)
          .expect(200)
          .then(res =>
            expect(res.body.productId).toBe(product.productId),
          );
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        await supertest(app).post("/api/products").expect(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        const jwt = signJWT(userPayload);

        await supertest(app).post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload)
          .expect(200)
          .then(res => {
            expect(res.body).not.toBeNull();
            expect(res.body).toEqual({
              ...(omit(productPayload, "user")),
              __v: 0,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              user: expect.any(String),
              productId: expect.any(String),
            });
          });
      });
    });
  });
});
