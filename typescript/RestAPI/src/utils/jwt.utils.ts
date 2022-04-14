import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

/**
 * Takes whatever object you give it and encodes it as a JWT.
 * @param object
 * @param options
 * @returns
 */
export function signJWT(object: Record<string, unknown>, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, {
    ...options,
    algorithm: "RS256",
  });
}

/**
 * Validates the given JWT and returns the data within. If the token is expired
 * it will fail here.
 * This might not be 100% accurate - it's just a practice project.
 * @param token
 * @returns
 */
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
