const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New test',
        author: 'IrminDev',
        url: 'https://irmin.dev',
        likes: 0,
    }

    const userToLogin = {
        username: 'root',
        password: 'sekret'
    }

    console.log('newBlog', newBlog)

    
    const resp = await api.post('/api/login')
    .send(userToLogin)
    .expect(200)

    console.log('resp.body', resp.body)

    await api.post('/api/blogs')
    .set('Authorization', `bearer ${resp.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain('New test')
}, 10000)

test('an invalid user cant add new blog', async () => {
  const newBlog = {
      title: 'New test',
      author: 'IrminDev',
      url: 'https://irmin.dev',
      likes: 0,
  }
  
  await api.post('/api/blogs')
  .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YWYzNzlhYzliYmZjZWVmMmEzNzJlYSIsImlhdCI6MTY4OTIwODc1NX0.0athIgOJzNe0OJ2s0FaeNAOFjIe2EH55r64WN-5G-fA`)
  .send(newBlog)
  .expect(401)
}, 10000)

test('likes default to 0', async () => {
    const newBlog = {
        title: 'New test',
        author: 'IrminDev',
        url: 'https://irmin.dev',
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(lastBlog.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        url: 'https://irmin.dev',
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(n => n.id)
    expect(contents).not.toContain(blogToDelete.id)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
        title: 'New update',
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.title).toBe('New update')
})

afterAll(() => {
    mongoose.connection.close()
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()

      const user2 = new User({ username: 'root2', passwordHash })

      await user2.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('username too short is not added', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: '1',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
    })

    test('username duplicated is not added', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: '1',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
    })
})