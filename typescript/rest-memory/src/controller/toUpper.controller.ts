import { Request, Response } from "express";
import { ToUpperInput } from "../schema/toUpper.schema";

export function toUpperHandler(
  req: Request<Record<string, unknown>, Record<string, unknown>, ToUpperInput["body"]>,
  res: Response,
) {
  const { input } = req.body;
  return res.send({ input, output: input.toUpperCase() });
}
