// /api/todos.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo.js'); // Todo 모델을 가져옵니다.


console.log("todos.js loaded");
// 모든 Todo 항목 가져오기 //id로 가져오기
router.get('/', async (req, res) => {
  const { userId } = req.query;
  // console.log(userId);
  try {
    const todos = await Todo.find({ userId });
    // console.log("todos"+todos);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// 새 Todo 항목 생성하기
router.post('/', async (req, res) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set the time to 0 hours, 0 minutes, 0 seconds, and 0 milliseconds

  const todo = new Todo({
    name: req.body.name,
    doneToday: req.body.doneToday,
    userId: req.body.userId,
    createAt: now, // 오늘 날짜+0시0분0초
    doneTotal: [],
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// todo check하기

router.patch('/:_id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params._id, 
        req.body, 
        { new: true } // This option returns the updated document
      );
      // console.log(req.params._id);
      // console.log(req.body)
      if (!todo) {
        res.status(404).send("No item found");
      } else {
        res.status(200).json(todo);
      }
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });


// Todo 항목 삭제하기
router.delete('/:_id', async (req, res) => {
  console.log("delete");
  try {
    // console.log(req.params);
    await Todo.deleteOne({ _id:req.params._id });
    res.json({ message: 'Todos deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
