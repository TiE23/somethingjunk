import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

/**
 * This establishes a connection to the MongoDB instance based off the dbUri.
 */
export default async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}
