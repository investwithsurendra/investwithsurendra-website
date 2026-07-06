import { MongoClient } from "mongodb";

let cached = global._iwsMongo;
if (!cached) cached = global._iwsMongo = { client: null, db: null, promise: null };

export async function getDb() {
  if (cached.db) return cached.db;
  if (!cached.promise) {
    cached.promise = MongoClient.connect(process.env.MONGO_URL).then((client) => {
      cached.client = client;
      cached.db = client.db(process.env.DB_NAME || "invest_with_surendra");
      return cached.db;
    });
  }
  return cached.promise;
}

export function stripId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
}
