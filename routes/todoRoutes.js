const { Router } = require('express')
const router = Router()
const Todo = require('../model/Todo')

router.post('/add', async (req, res) => {
  try {
    const { text, userId } = req.body
    const todo = await Todo({ 
        text, 
        owner: userId,
        completed: false,
        important: false
    })
    await todo.save()
    res.json(todo)
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const userId = req.query;

    const todos = await Todo.find({ owner: userId.userId });
    res.json(todos);

  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const todos = await Todo.findByIdAndDelete({_id: req.params.id});
    res.json(todos);

  } catch (error) {
    console.log(error);
  }
})

router.put('/complated/:id', async (req, res) => {
    try {
      const todo = await Todo.findOne({_id: req.params.id})
      todo.completed = !todo.completed;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.log(error);
    }
})
router.put('/important/:id', async (req, res) => {
    try {
      const todo = await Todo.findOne({_id: req.params.id})
      todo.important = !todo.important;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.log(error);
    }
})

module.exports = router
