const express = require("express");
const Todo = require("../models/Todo"); // Todo 모델 import
const router = express.Router();

// GET: 모든 할 일 가져오기
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find(); // 모든 할 일 가져오기
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// POST: 새 할 일 추가하기
router.post("/todos", async (req, res) => {
  try {
    const { content, date, category } = req.body;

    // 새로운 할 일 생성
    const newTodo = new Todo({
      id: (await Todo.countDocuments()) + 1, // ID 자동 설정
      content,
      date,
      category,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
});

// PUT: 할 일 수정하기
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: parseInt(id) },
      req.body, // 요청 바디의 내용을 업데이트
      { new: true } // 업데이트 후 새로운 데이터를 반환
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// DELETE: 할 일 삭제하기
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ id: parseInt(id) });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

module.exports = router; // router를 export