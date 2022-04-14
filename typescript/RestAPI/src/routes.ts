import { Express, Request, Response } from "express";

import validateResource from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";

import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controller/user.controller";
import { createSessionSchema } from "./schema/session.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

export default function routes(app: Express) {
  // Arguments for get/post are the path and callbacks. Call next() to continue
  // the callbacks in the args.
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // It's important to add some middleware here, otherwise we won't be validating anything!
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)], // Note: Using an array is optional.
    createProductHandler,
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler,
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler,
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler,
  );
}
