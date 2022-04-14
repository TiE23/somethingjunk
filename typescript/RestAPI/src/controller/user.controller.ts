import { Request, Response } from "express";

import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

import logger from "../utils/logger";

/**
 * Creates a new user account with their email, name, and password.
 * Validation is required as middleware with the route otherwise there is no
 * checking being performed here.
 * @param req
 * @param res
 * @returns
 */
export async function createUserHandler(
  // Here we use zod to help us define a type that will be used to define the req object.
  req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserInput["body"]>,
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
