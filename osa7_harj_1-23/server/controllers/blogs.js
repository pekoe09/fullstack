const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  try {
    const match = await Blog.findById(request.params.id)
    if (!match) {
      return response.status(400).send({ error: 'nonexistent id' })
    }
    if (!body.comment) {
      return response.status(400).json({ error: 'comment is mandatory' })
    }

    match.comments = match.comments.concat(body.comment)
    const commentedBlog = await Blog.findByIdAndUpdate(match.id, match, { new: true })
    response.json(Blog.format(commentedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'encountered an error while inserting a comment' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!body.title) {
      return response.status(400).json({ error: 'title is mandatory' })
    }

    if (!body.url) {
      return response.status(400).json({ error: 'url is mandatory' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
      comments: []
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'encountered an error' })
    }
  }
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
    blog.comments = match.comments
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updatedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete a blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
  }
})

module.exports = blogsRouter