import mongoose from "mongoose"
import { MONGO_URI } from "./secrets.js"
mongoose.Promise = global.Promise;

const dbConnection = async () => {
  mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("could not connect");
  });
  db.once("open", () => {
    console.log("> Successfully connected to database");
  });
};
export default dbConnection