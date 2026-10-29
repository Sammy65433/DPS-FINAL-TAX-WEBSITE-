import { MongoClient } from "mongodb";
import { env } from "./env.js";

const uri = env.MONGODB_URI || process.env.MONGODB_URI;

if (!uri) {
    throw new Error(
        "MONGODB_URI is not configured. Set it in your environment (Render dashboard or .env)."
    );
}

export const mongoClient = new MongoClient(uri);

export async function getDatabase() {
    await mongoClient.connect();
    return mongoClient.db("dps_tax_booking");
}
