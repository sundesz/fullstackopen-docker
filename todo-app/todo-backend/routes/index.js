const express = require('express')
const router = express.Router()
const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (_, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (_, res) => {
  try {
    const redis_todo = await redis.getAsync('added_todos')
    res.json({ added_todos: +redis_todo || 0 })
  } catch (error) {
    res.json({ error: error.message })
  }
})

module.exports = router
