import express from "express";
import config from "config";

import routes from "./routes";

import connect from "./utils/connect";
import logger from "./utils/logger";

const port = config.get<number>("port");
const app = express();

// Applies to every route under this call.
app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
  routes(app);
});
