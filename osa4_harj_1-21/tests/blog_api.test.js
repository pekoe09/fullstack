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

describe('POST /api/blogs', () => {

  beforeEach(async () => {
    await Blog.remove({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('adds a blog', async () => {
    const newBlog = {
      title: 'Test blog 1',
      author: 'Test author 1',
      url: '/blog/inabog',
      likes: 13
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(blogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('sets likes default value 0', async () => {
    const newBlog = {
      title: 'Test blog 1',
      author: 'Test author 1',
      url: '/blog/inabog'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)

    const storedBlogs = await api.get('/api/blogs')
    const match = storedBlogs.body.find(blog => blog._id === result.body._id)    

    expect(result.body.likes).toBe(0)
    expect(match.likes).toBe(0)
  })

})

afterAll(() => {
  server.close()
})