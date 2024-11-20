// api/todos.js
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI; // Vercel 환경 변수에 MongoDB URI를 설정해야 함
const client = new MongoClient(MONGODB_URI);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db();
  const collection = db.collection("todos");

  if (req.method === "GET") {
    // GET 요청: 모든 Todos 가져오기
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // POST 요청: 새로운 Todo 추가
    const { content, date, category } = req.body;
    const newTodo = { content, date, category };
    const result = await collection.insertOne(newTodo);
    res.status(201).json(result.ops[0]);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

  client.close();
}