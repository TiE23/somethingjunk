import express from "express";

import routes from "../routes";

export default function createServer() {
  const app = express();

  // Support JSON format input.
  app.use(express.json());

  // Provide the routes.
  routes(app);

  return app;
}
