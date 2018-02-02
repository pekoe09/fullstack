const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const blogs = require('./testblogs')
const Blog = require('../models/blog')

describe('GET /api/blogs', () => {

  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('works', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
  })

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(blogs.length)
  })

  test('specific blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    blogs.forEach(blog => expect(response.body).toContainEqual(blog))
  })
})

afterAll(() => {
  server.close()
})