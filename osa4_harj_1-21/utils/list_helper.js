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

module.exports = {
  dummy,
  totalLikes
}