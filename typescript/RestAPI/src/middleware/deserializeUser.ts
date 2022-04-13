import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {

  // Using lodash's get() function to get some data with dot notation that may not
  // exist. In which case we default to an empty string. Then, we strip the
  // access token from the "Bearer" token string.
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  if (!accessToken) {
    // Continue on from this middleware.
    return next();
  }

  const { decoded, expired } = verifyJWT(accessToken);

  // If JWT is valid it'll have the decoded payload. Else null.
  if (decoded) {
    // This is going to attach the
    res.locals.user = decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
