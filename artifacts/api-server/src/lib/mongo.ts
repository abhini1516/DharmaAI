import { MongoClient, type Db } from "mongodb";
import { logger } from "./logger";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is required");
}

const client = new MongoClient(uri);
let db: Db | null = null;
let connecting: Promise<Db> | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (!connecting) {
    connecting = client.connect().then((connectedClient) => {
      db = connectedClient.db("dharma_ai");
      logger.info("Connected to MongoDB");
      return db;
    });
  }
  return connecting;
}

export async function getLawyersCollection() {
  const database = await getDb();
  return database.collection("lawyers");
}
