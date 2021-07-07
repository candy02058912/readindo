import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import { mongoClient } from "server/db/mongo";

axios.defaults.baseURL = `https://${process.env.TRANSLATOR_API_HOST}`;
axios.defaults.headers = {
  "Content-Type": "application/json",
  "x-rapidapi-key": process.env.TRANSLATOR_API_KEY,
  "x-rapidapi-host": process.env.TRANSLATOR_API_HOST,
};
axios.defaults.method = "POST";

export const getWord = (text: string) => {
  const options = {
    url: "/Dictionary/Lookup",
    params: { from: "id", "api-version": "3.0", to: "en" },
    data: [{ Text: text }],
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const saveWord = async (
  userId: string,
  text: string,
  translation: string
) => {
  const client = mongoClient;
  await client.connect();
  const database = client.db("readindo");
  const collection = database.collection("words");
  await collection.insertOne({ text, translation, user_id: userId });
  await client.close();
};

export const getWordList = async (userId: string) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const database = client.db("readindo");
  const collection = database.collection("words");
  const wordList = await collection
    .find({ user_id: userId }, { projection: { text: 1, translation: 1 } })
    .toArray();
  await client.close();
  return wordList;
};

export const deleteWord = async (id: string) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const database = client.db("readindo");
  const collection = database.collection("words");
  await collection.deleteOne({ _id: new ObjectId(id) });
  await client.close();
};
