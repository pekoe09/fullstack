const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, resetDb, nonExistingId } = require('./test_helper')

describe('GET /api/blogs', () => {

  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
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

    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('specific blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    initialBlogs.forEach(blog => expect(response.body).toContainEqual(blog))
  })

})

describe('POST /api/blogs', () => {

  beforeEach(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
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

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    const titles = blogsAfter.map(b => b.title)

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
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

    const blogsInDatabase = await blogsInDb()
    const match = blogsInDatabase.find(b => b.id.toString() === result.body._id)

    expect(result.body.likes).toBe(0)
    expect(match.likes).toBe(0)
  })

  test('does not accept blog without title', async () => {
    const newBlog = {
      author: 'Test author 1',
      url: '/blog/inabog'
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('does not accept blog with empty string title', async () => {
    const newBlog = {
      title: '',
      author: 'Test author 1',
      url: '/blog/inabog'
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('does not accept blog without url', async () => {
    const newBlog = {
      title: 'Test blog 1',
      author: 'Test author 1'
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('does not accept blog with empty string url', async () => {
    const newBlog = {
      title: 'Test  blog 1',
      author: 'Test author 1',
      url: ''
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

})

describe('DELETE /api/blogs/:id', () => {

  beforeEach(async () => {
    await resetDb()
  })

  test('removes a blog', async () => {
    const blogsBefore = await blogsInDb()
    const targetId = blogsBefore[2].id

    await api
      .delete(`/api/blogs/${targetId}`)
      .expect(204)

    const blogsAfter = await blogsInDb()
    const ids = blogsAfter.map(b => b.id)
    const ids2 = blogsBefore.map(b => b.id)

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    expect(ids2).toContain(targetId)
    expect(ids).not.toContain(targetId)
  })

  test('returns 204 for non-existing id, too', async () => {
    const blogsBefore = await blogsInDb()
    const targetId = await nonExistingId()

    await api
      .delete(`/api/blogs/${targetId}`)
      .expect(204)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

})

describe('PUT /api/notes/:id', () => {

  beforeEach(async () => {
    await resetDb()
  })

  test('updates an existing blog correctly', async () => {
    const blogsBefore = await blogsInDb()
    const target = blogsBefore[2]
    target.title = 'Updated title'
    target.author = 'Updated author'
    target.url = 'Updated url'
    target.likes = 1000

    await api
      .put(`/api/blogs/${target.id}`)
      .send(target)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    const match = blogsAfter.find(b => b.id.toString() === target.id.toString())

    expect(blogsAfter.length).toBe(blogsBefore.length)
    expect(match).toEqual(target)
  })

  test('returns 400 for non-existing id', async () => {
    const blogsBefore = await blogsInDb()
    const fakeId = await nonExistingId()
    const target = blogsBefore[2]
    target.id = fakeId

    await api
      .put(`/api/blogs/${fakeId}`)
      .send(target)
      .expect(400)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

})