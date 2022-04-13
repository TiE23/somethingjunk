import { FilterQuery } from "mongoose";

import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  // .lean() means it returns a stripped-down, data only object (sans methods).
  return SessionModel.find(query).lean();
}
