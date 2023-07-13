const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const user = await User.findById(decodedToken.id)

    if(!body.title || !body.url) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const blogContent = await blog.save()
    user.blogs = user.blogs.concat(blogContent._id)
    await user.save()

    response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const blog = await Blog.findById(request.params.id)
    console.log('blog.user', blog.user.toString())
    console.log('decodedToken.id', decodedToken.id.toString())
    if(blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(401).json({
            error: 'only the creator can delete blogs'
        })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(204).end()
})

module.exports = blogRouter