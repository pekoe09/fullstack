const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs && blogs.length > 0) {
    return blogs.reduce((totalLikes, blog) => {
      return blog.likes + totalLikes
    }, 0)
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  let favorite = null
  if (blogs && blogs.length > 0) {
    blogs.forEach(blog => {
      if (!favorite || blog.likes > favorite.likes) {
        favorite = blog
      }
    })
  }
  return favorite
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] = authors[blog.author] + 1
    } else {
      authors[blog.author] = 1
    }
  })
  let mostDiligent = {
    author: Object.keys(authors)[0],
    blogs: authors[Object.keys(authors)[0]]
  }
  Object.keys(authors).forEach((key) => {
    if (mostDiligent.blogs < authors[key]) {
      mostDiligent.author = key,
      mostDiligent.blogs = authors[key]
    }
  })
  return mostDiligent.author ? mostDiligent : null
}

const mostLikes = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] = authors[blog.author] + blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })
  let mostLiked = {
    author: Object.keys(authors)[0],
    likes: authors[Object.keys(authors)[0]]
  }
  Object.keys(authors).forEach((key) => {
    if (mostLiked.likes < authors[key]) {
      mostLiked.author = key,
      mostLiked.likes = authors[key]
    }
  })
  return mostLiked.author ? mostLiked : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}