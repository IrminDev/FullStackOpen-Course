const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (request, response) => {
    console.log('request.body', request.body)
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter