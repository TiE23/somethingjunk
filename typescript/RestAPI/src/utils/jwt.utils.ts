import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

// eslint-disable-next-line @typescript-eslint/ban-types
export function signJWT(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, {
    ...options,
    algorithm: "RS256",
  });
}

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
