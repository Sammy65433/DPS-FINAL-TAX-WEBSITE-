import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const mongoClient = new MongoClient(env.MONGODB_URI);

export async function getDatabase() {
    await mongoClient.connect();
    return mongoClient.db("dps_tax_booking");
}
