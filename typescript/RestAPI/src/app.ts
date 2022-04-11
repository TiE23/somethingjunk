import { toUpperCase } from "./utils/strings";
import express from "express";

const app = express();
app.listen(1337, () => {
  console.log("App is running");
});

const message = "Hello world!";

console.log(toUpperCase(message));
