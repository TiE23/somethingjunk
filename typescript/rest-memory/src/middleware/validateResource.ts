import { Request, Response, NextFunction } from "express";
import z from "zod";

/**
 * This utilizes the functionality of zod where it'll take a zod schema and then
 * take the body, query, and params of the request and perform a check against
 * it. If there are problems it'll throw with informative error details we can
 * use to inform the user what went wrong.
 * https://github.com/colinhacks/zod#parse
 * Do note that this is a curry function, so, you call this with the schema you're
 * checking and provide that as a middleware function.
 * @param schema
 * @returns
 */
const validate = (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req;
      schema.parse({ body, query, params });
      return next();
    } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
      return res.status(400).send(error.errors);
    }
  };

export default validate;
