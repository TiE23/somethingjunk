import { Request, Response } from "express";
import config from "config";

import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJWT } from "../utils/jwt.utils";

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
    session: session._id,
  }, {
    expiresIn: config.get<string>("accessTokenTTL"),  // 15 minutes
  });

  // Create a refresh token.
  const refreshToken = signJWT({
    ...user,
    session: session._id,
  }, {
    expiresIn: config.get<string>("refreshTokenTTL"), // 1 year
  });

  // Return access and refresh tokens.
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({
    user: userId,
    valid: true,
  });

  return res.send(sessions);
}


