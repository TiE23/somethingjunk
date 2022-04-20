import config from "config";

import logger from "./utils/logger";
import connect from "./utils/connect";
import createServer from "./utils/server";

const app = createServer();

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  // Connect to the MongoDB.
  await connect();
});
