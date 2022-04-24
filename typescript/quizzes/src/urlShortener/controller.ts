import { Request, Response } from "express";
import { createDB, urlShortener } from "./index";
import { ShortenerInput } from "./schema";

export function shortenHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    ShortenerInput["body"]
  >,
  res: Response,
) {
  const tempFakeDb = createDB();

  const shortenedUrl = urlShortener(
    req.body.url,
    tempFakeDb,
    8,
  );

  return res.send({ url: `http://localhost:8080/${shortenedUrl}` });
}
