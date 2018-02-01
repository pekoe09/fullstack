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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}