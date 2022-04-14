import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

import { verifyJWT } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import logger from "../utils/logger";

/**
 * This middleware gets used in every API call through api.use().
 * It's responsible for
 * @param req
 * @param res
 * @param next
 * @returns
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

  // Using lodash's get() function to get some data with dot notation that may not
  // exist. In which case we default to an empty string. Then, we strip the
  // access token from the "Bearer" token string.
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    // Continue on from this middleware.
    return next();
  }

  const { decoded, expired } = verifyJWT(accessToken);

  // If JWT is valid it'll have the decoded payload. Else null.
  if (decoded) {
    // This is going to attach the user to the response.
    res.locals.user = decoded;
    return next();
  }

  // Check if we want to re-issue an accessToken
  if (expired && refreshToken) {
    logger.info("AccessToken was expired but refreshToken is provided");

    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      // Add this to the header. The client (in this case, PostMan) will pick it
      // up and update the access token for the next API call.
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJWT(newAccessToken);

      // Slickly update the user's token before continuing.
      res.locals.user = result.decoded;
      return next();
    } else {
      // Don't call next if you want to return a status.
      return res.status(403).send("Your refresh token has expired! Log in again!");
    }
  }

  return next();
};

export default deserializeUser;
