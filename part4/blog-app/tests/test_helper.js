const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'IrminDev',
        url: 'http://irmindev.com',
        likes: 5,
    },
    {
        title: 'Blog 2',
        author: 'IrminDev',
        url: 'http://irmindev.com',
        likes: 10,
    },
    {
        title: 'Blog 3',
        author: 'Cristal',
        url: 'http://cristal.dev',
        likes: 13,
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'IrminDev', likes: 0 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb,
}