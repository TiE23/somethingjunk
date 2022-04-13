import { Request, Response } from "express";
import config from "config";

import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJWT } from "../utils/jwt.utils";

/**
 * Creates a new session for the user.
 * @param req
 * @param res
 * @returns
 */
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password.
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // Create a session.
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an access token.
  const accessToken = signJWT({
    ...user,
    sessionId: session._id,
  }, {
    expiresIn: config.get<string>("accessTokenTTL"),  // 15 minutes
  });

  // Create a refresh token.
  const refreshToken = signJWT({
    ...user,
    sessionId: session._id,
  }, {
    expiresIn: config.get<string>("refreshTokenTTL"), // 1 year
  });

  // Return access and refresh tokens.
  return res.send({ accessToken, refreshToken });
}


/**
 * Retrieves the sessions that are valid and belong to the calling user.
 * @param req
 * @param res
 * @returns
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({
    user: userId,
    valid: true,
  });

  return res.send(sessions);
}


/**
 * We don't actually delete the session. We rather just set `valid` to false.
 * @param req
 * @param res
 * @returns
 */
export async function deleteSessionHandler(req: Request, res: Response) {
  // This is safe to grab since we added the requireUser middleware before any use of this.
  const sessionId = res.locals.user.session;

  // Internal call to update DB entries.
  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
