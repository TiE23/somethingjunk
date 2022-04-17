import { DocumentDefinition } from "mongoose";

import CaseChangeModel, { CaseChangeInput, CaseChangeOutput } from "../model/caseChange.model";


/**
 * Writes the results of the case change to the database.
 * @param input
 * @returns
 */
export async function caseChangeSave(
  input: DocumentDefinition<CaseChangeInput & CaseChangeOutput>,
) {
  try {
    const result = await CaseChangeModel.create(input);
    return result;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
