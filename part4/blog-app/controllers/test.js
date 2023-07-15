const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

testingRouter.get('/', async (request, response) => {
    response.json({message: 'testing route'})
  })

module.exports = testingRouter