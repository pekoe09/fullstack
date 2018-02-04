const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./test_helper')

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

  test('sets isAdult default to true', async () => {
    const newUser = {
      username: 'Newuser',
      password: 'xyz123%?',
      name: 'New User'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)

    const usersInDatabase = await usersInDb()
    const match = usersInDatabase.find(u => u.id.toString() === result.body._id)

    expect(result.body.isAdult).toBe(true)
    expect(match.isAdult).toBe(true)
  })

  test('does not accept user without a username', async () => {
    const newUser = {
      password: 'xyz123%?',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'username is missing' })
  })

  test('does not accept user with an empty string a the username', async () => {
    const newUser = {
      username: '',
      password: 'xyz123%?',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'username is missing' })
  })

  test('does not accept user with an existing username', async () => {
    const newUser = {
      username: initialUsers[0].username,
      password: 'xyz123%?',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'username is already in use' })
  })

  test('does not accept user without a password', async () => {
    const newUser = {
      username: 'Newuser',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'password is missing' })
  })

  test('does not accept user with an empty string as the password', async () => {
    const newUser = {
      username: 'Newuser',
      password: '',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'password is missing' })
  })

  test('does not accept user with a password shorter than 3 chars', async () => {
    const newUser = {
      username: 'Newuser',
      password: 'x1',
      name: 'New User',
      isAdult: true
    }

    const usersBefore = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(response.body).toEqual({ error: 'password is shorter than 3 chars' })
  })
})

afterAll(() => {
  server.close()
})