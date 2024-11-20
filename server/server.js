require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes"); // todoRoutes 라우트 파일 import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Todo List API is running!");
});

// 라우트 설정
app.use("/api", todoRoutes); // /api 경로에 todoRoutes 연결

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
