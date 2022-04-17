import express from "express";
import config from "config";

import routes from "./routes";
import logger from "./utils/logger";
import connect from "./utils/connect";

const app = express();

// Support JSON format input.
app.use(express.json());

// Provide the routes.
routes(app);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  // Connect to the MongoDB.
  await connect();
});
