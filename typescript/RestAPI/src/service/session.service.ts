import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";

import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";
import { findUser } from "./user.service";


/**
 * Creates a new session in the database and returns the contents.
 * @param userId
 * @param userAgent
 * @returns
 */
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}


/**
 * Search for sessions that match the given query.
 * @param query Provide an object with the desired matching data. For example:
 * { _id: "abcd1234" }
 * @returns Just the "lean" data, no methods.
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
  // .lean() means it returns a stripped-down, data only object (sans methods).
  return SessionModel.find(query).lean();
}


/**
 * Updates a session entry.
 * @param query Provide an object with the desired matching data. For example:
 * { _id: "abcd1234" }
 * @param update Provide an object with the desired update data. For example:
 * { valid: false }
 * @returns
 */
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return SessionModel.updateOne(query, update);
}


/**
 * Give it a refreshToken and if it's still valid it'll give you a new access
 * token immediately.
 * @param refreshToken
 * @returns
 */
export async function reIssueAccessToken( refreshToken: string) {
  logger.info("Attempting to re-issue access token");

  const { decoded } = verifyJWT(refreshToken);
  const sessionId = get(decoded, "sessionId", false);

  // Check if the decoded sessionId is present.
  if (!decoded || !sessionId) return false;

  // Get the session from the DB.
  const session = await SessionModel.findById(sessionId);

  // Check if the session is good.
  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  // Check if the user is good.
  if (!user) return false;

  // Create an access token.
  const accessToken = signJWT({
    ...user,
    session: session._id,
  }, {
    expiresIn: config.get<string>("accessTokenTTL"),
  });

  logger.info("Access token successfully re-issued");
  return accessToken;
}
