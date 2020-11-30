import {MongoClient} from '../dependencies/deps.ts'

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("deno_survey");
export const usersCollection = db.collection("users");
export const surveyCollection = db.collection("survey");
export const questionCollection = db.collection("question");

