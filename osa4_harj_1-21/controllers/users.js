const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { _id: 1, likes: 1, title: 1, author: 1, url: 1 })
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.username) {
      return response.status(400).json({ error: 'username is missing' })
    }
    const match = await User.find({ username: body.username })
    console.log(match)
    if (match.length > 0) {
      return response.status(400).json({ error: 'username is already in use' })
    }
    if (!body.password) {
      return response.status(400).json({ error: 'password is missing' })
    }
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password is shorter than 3 chars' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
      isAdult: body.isAdult === undefined ? true : body.isAdult
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'encountered an error' })
  }
})

module.exports = usersRouter