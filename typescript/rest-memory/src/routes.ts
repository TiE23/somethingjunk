import { Express, Request, Response } from "express";

import logger from "./utils/logger";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    logger.info("Healthcheck requested.");
    return res.sendStatus(200);
  });

}
