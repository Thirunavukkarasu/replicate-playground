import * as dotenv from "dotenv";
dotenv.config();

import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();
await pinecone.init({
  environment: process.env.PINE_CONE_ENVIRONMENT,
  apiKey: process.env.PINE_CONE_API_KEY,
});

export async function createIndex() {
  await pinecone.createIndex({
    createRequest: {
      name: "product-embeddings",
      dimension: 1024,
    },
  });
}

export async function listIndexes() {
  const indexesList = await pinecone.listIndexes();
  console.log(indexesList);
  return indexesList;
}

export async function upsertVectors() {
  const index = pinecone.Index("product-embeddings");
  const upsertRequest = {
    vectors: [
      {
        id: `vec-${Math.random() * 100}`,
        values: [0.1, 0.2, 0.3, 0.4],
        metadata: {
          genre: "drama",
        },
      },
      {
        id: `vec-${Math.random() * 100}`,
        values: [0.2, 0.3, 0.4, 0.5],
        metadata: {
          genre: "action",
        },
      },
    ],
  };

  const upsertResponse = await index.upsert({ upsertRequest });
  console.log(upsertResponse);
}

export async function queryIndex() {
  const index = pinecone.Index("product-embeddings");
  const queryRequest = {
    vector: [0.1, 0.2, 0.3, 0.4],
    topK: 10,
    includeValues: true,
    includeMetadata: true,
    filter: {
      genre: { $in: ["comedy", "documentary", "drama"] },
    },
    namespace: "example-namespace",
  };
  const queryResponse = await index.query({ queryRequest });
}

listIndexes();
upsertVectors();
