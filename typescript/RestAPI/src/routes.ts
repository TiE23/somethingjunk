import { Express, Request, Response } from "express";

import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./shema/user.schema";
import validateResource from "./middleware/validateResource";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // It's important to add some middleware here, otherwise we won't be validating anything!
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

}
