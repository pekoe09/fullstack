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
  let wordiest = {
    author: Object.keys(authors)[0],
    blogs: authors[Object.keys(authors)[0]]
  }
  Object.keys(authors).forEach((key) => {
    if (wordiest.blogs < authors[key]) {
      wordiest.author = key,
      wordiest.blogs = authors[key]
    }
  })
  return wordiest.author ? wordiest : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}