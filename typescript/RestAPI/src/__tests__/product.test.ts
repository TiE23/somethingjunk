// supertest is a way to test our API.
import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import createServer from "../utils/server";
import { createProduct, findProduct } from "../service/product.service";
import { signJWT } from "../utils/jwt.utils";

const app = createServer();

// Build a test product.
const userId = new mongoose.Types.ObjectId().toString();
export const productPayload = {
  user: userId,
  title: "Test Title",
  description: "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test",
  price: 1.00,
  image: "https://google.com/",
};

export const userPayload = {
  _id: userId,
  email: "example@example.com",
  name: "Exam Pul",
};

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
              title: "Test Title",
              description: "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test",
              price: 1.00,
              image: "https://google.com/",
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
