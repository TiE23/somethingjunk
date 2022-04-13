import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";

// This is an example of currying where you're creating a function through a function.
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // If zod's parse function throws an error, we know something was wrong!
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Don't forget! It'll just hang otherwise!
    return next();
  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    return res.status(400).send(error.errors);
  }
};

export default validate;
