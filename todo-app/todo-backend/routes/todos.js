const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  try {
    const todos = await Todo.find({})
    res.send(todos)
  } catch (error) {
    console.log(error.message)
  }
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const prevTodos = await redis.getAsync('added_todos')
  await redis.setAsync('added_todos', Number(prevTodos) + 1 || 1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = {
    text: req.body.text || req.todo.text,
    done: req.body.done || req.todo.done,
  }

  try {
    await Todo.updateOne({ _id: req.todo._id }, todo)
    res.json({ message: 'Update sucessfully' })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
