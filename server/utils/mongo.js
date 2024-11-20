import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export const connectToDatabase = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(); // DB 이름을 지정하지 않으면 기본 DB로 연결
};