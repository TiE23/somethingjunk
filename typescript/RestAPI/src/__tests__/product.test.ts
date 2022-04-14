// supertest is a way to test our API.
import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import createServer from "../utils/server";
import { createProduct, findProduct } from "../service/product.service";

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
});
