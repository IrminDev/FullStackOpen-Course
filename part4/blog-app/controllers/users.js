const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.password || body.password.length < 3) {
        return response.status(400).json({
            error: 'password missing or too short'
        })
    }

    if(!body.username || body.username.length < 3) {
        return response.status(400).json({
            error: 'username missing or too short'
        })
    }

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
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
})

module.exports = usersRouter