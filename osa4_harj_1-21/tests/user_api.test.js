const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDb, resetDb } = require('./test_helper')

describe('GET /api/users', () => {

  beforeAll(async () => {
    await User.remove({})

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('works', async () => {
    await api
      .get('/api/users')
      .expect(200)
  })

  test('returns users as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of users are returned', async () => {
    const response = await api
      .get('/api/users')

    expect(response.body.length).toBe(initialUsers.length)
  })

  test('specific users are returned', async () => {
    const response = await api
      .get('/api/users')

    const usernames = response.body.map(user => user.username)
    initialUsers.forEach(user => expect(usernames).toContain(user.username))
  })

})

describe('POST /api/users', () => {

  beforeEach(async () => {
    await User.remove({})

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('adds a user', async () => {
    const newUser = {
      username: 'Newuser',
      password: 'xyz123%?',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()
    const usernames = usersAfter.map(u => u.username)

    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usernames).toContain(newUser.username)
  })
  
})
