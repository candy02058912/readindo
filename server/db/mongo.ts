import { MongoClient } from "mongodb";

if (typeof process.env.MONGODB_URI === "undefined") {
  throw "You forgot to set MONGODB_URI!";
}
export const mongoClient = new MongoClient(process.env.MONGODB_URI);
