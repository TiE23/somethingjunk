import { Request, Response } from "express";

import { createUser } from "../service/user.service";
import { CreateUserInput } from "../shema/user.schema";

import logger from "../utils/logger";

export async function createUserHandler(
  // Here we use zod to help us define a type that will be used to define the req object.
  req: Request<{}, {}, CreateUserInput["body"]>,  // eslint-disable-line @typescript-eslint/ban-types
  res: Response,
) {
  try {
    const user = await createUser(req.body);

    return res.send(user);
  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.error(error);
    return res.status(409).send(error.message); // 409 = "Conflict"
  }
}
