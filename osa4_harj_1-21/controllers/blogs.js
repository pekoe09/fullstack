const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'mandatory fields missing' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  let users = await User.find({})
  const user = users[0]
  blog.user = user._id

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  users = await User.find({})
  console.log(users)
  console.log('Updated user:')
  console.log(user)
  await user.save()

  response.status(201).json(Blog.format(savedBlog))
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const match = await Blog.findById(request.params.id)
    if (!match) {
      return response.status(400).send({ error: 'nonexistent id' })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updatedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter