import crypto from "crypto";

export interface FakeDB {
  shortUrls: {
    [url: string]: {
      longHash: string,
    },
  };
}


/**
 * Create a memory DB. Cool
 * @returns
 */
export function createDB(): FakeDB {
  return {
    shortUrls: {},
  };
}

export function urlShortener(url: string, db: FakeDB, len = 8) {
  const shorten = (hash: string) => hash.slice(0, len);

  if (db.shortUrls[url] == null) {
    // Return SHA512 Hash, the first 8 char
    const hash = crypto.createHash("sha512");
    const data = hash.update(url, "utf-8");
    const longHash = data.digest("hex");
    db.shortUrls[url] = { longHash };
    return shorten(longHash);

  } else {
    return shorten(db.shortUrls[url].longHash);

  }
}

