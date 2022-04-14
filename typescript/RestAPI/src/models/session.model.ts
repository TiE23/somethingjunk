import mongoose from "mongoose";

import { UserDocument } from "./user.model";

export interface SessionInput {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

// Note: Mongoose recommends that you do not extend mongoose.Document
export interface SessionDocument extends SessionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema definition
const sessionSchema = new mongoose.Schema({
  // This is going to reference our already-established User model.
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
}, {
  timestamps: true,
});

// Model definition
const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
