import "../lib/env";
import { getLawyersCollection } from "../lib/mongo";
import { lawyerSeed } from "../data/lawyerSeed";
import { logger } from "../lib/logger";

async function seed() {
  const collection = await getLawyersCollection();
  await collection.deleteMany({});
  await collection.insertMany(lawyerSeed);
  await collection.createIndex({ id: 1 }, { unique: true });
  logger.info(`Seeded ${lawyerSeed.length} lawyers into MongoDB`);
  process.exit(0);
}

seed().catch((err) => {
  logger.error({ err }, "Failed to seed lawyers");
  process.exit(1);
});
