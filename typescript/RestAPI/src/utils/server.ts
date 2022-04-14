import express from "express";
import deserializeUser from "../middleware/deserializeUser";

export default function createServer() {
  const app = express();

  // Applies to every route under this call.
  app.use(express.json());
  app.use(deserializeUser);

  return app;
}
