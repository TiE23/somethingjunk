import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export default async function connect() {
  const dbUri = config.get<string>("dbUri");

  // Using await (the good shit):
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error("Could not connect to DB", error);
    process.exit(1);
  }

  // Normal promise (without using async function):
  // return mongoose.connect(dbUri)
  //   .then(() => {
  //     logger.info("Connected to DB");
  //   }).catch(_error => {
  //     logger.error("Could not connect to DB");
  //     process.exit(1);
  //   });
}
