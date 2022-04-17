import mongoose from "mongoose";
import { ModeEnum as CaseChangeMode } from "../schema/caseChange.schema";

/**
 * We use mongoose and MongoDB to record caseChange requests.
 * This is just for demonstration purposes and is pretty useless.
 */

/**
 * The values that the user will provide.
 */
export interface CaseChangeInput {
  input: string;
  mode: CaseChangeMode;
}

/**
 * The values that the service will provide.
 */
export interface CaseChangeOutput {
  output: string;
}

/**
 * Additional (to input and output) values that will be provided when reading.
 */
export interface CaseChangeDocument extends CaseChangeInput, CaseChangeOutput {
  createdAt: Date;
  updatedAt: Date;
}

const caseChangeSchema = new mongoose.Schema({
  input: { type: String },
  output: { type: String },
  mode: { type: String, enum: Object.values(CaseChangeMode) },
}, {
  timestamps: true,
});

const CaseChangeModel = mongoose.model<CaseChangeDocument>(
  "CaseChange",
  caseChangeSchema,
);

export default CaseChangeModel;
