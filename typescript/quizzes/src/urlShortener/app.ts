import express, { Request, Response, NextFunction } from "express";
import z from "zod";
// import { createDB } from "./index";
import { shortenHandler } from "./controller";

import { shortenerUrlSchema } from "./schema";

const app = express();
// const fakeDB = createDB();

// Support JSON format input.
app.use(express.json());

const validateInput = (schema: z.AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body, query, res } = req;

    schema.parse({ body, query, res });

    return next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.sendStatus(400).send(error.errors);
  }
};

app.get(
  "/api/shorten",
  validateInput(shortenerUrlSchema),
  shortenHandler,
);


app.listen(8080, () => {
  console.log("Server running at localhost:8080");
});


