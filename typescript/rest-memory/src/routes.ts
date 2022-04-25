import { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import { caseChangeGetHandler, caseChangePostHandler } from "./controller/caseChange.controller";
import { createCaseChangeGetSchema, createCaseChangePostSchema } from "./schema/caseChange.schema";
import { createToUpperSchema } from "./schema/toUpper.schema";
import { toUpperHandler } from "./controller/toUpper.controller";

import logger from "./utils/logger";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    logger.info("Healthcheck requested.");
    return res.sendStatus(200);
  });

  app.post(
    "/api/casechange/:mode",
    validate(createCaseChangePostSchema),
    caseChangePostHandler,
  );
  app.get(
    "/api/casechange/:mode/:input",
    validate(createCaseChangeGetSchema),
    caseChangeGetHandler,
  );

  app.get(
    "/api/toupper",
    validate(createToUpperSchema),
    toUpperHandler,
  );

}
