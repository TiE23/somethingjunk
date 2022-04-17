import { Request, Response } from "express";

import { CaseChangeGetInput, CaseChangePostInput } from "../schema/caseChange.schema";
import { caseChangeSave } from "../service/caseChange.service";
import { caseChange } from "../utils/caseChange";

export async function caseChangePostHandler(
  req: Request<
    CaseChangePostInput["params"],
    Record<string, unknown>,
    CaseChangePostInput["body"]
  >,
  res: Response,
) {
  try {
    const { body: { input }, params: { mode } } = req;

    const result = await caseChangeSave({
      input,
      output: caseChange(input, mode),
      mode,
    });
    return res.send(result);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }
}

export function caseChangeGetHandler(
  req: Request<CaseChangeGetInput["params"]>,
  res: Response,
) {
  const { params: { input, mode } } = req;

  return res.send({
    input,
    output: caseChange(input, mode),
    mode,
  });
}
