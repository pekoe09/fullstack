const listHelper = require('../utils/list_helper')
const blogs = require('./testblogs')

test('dummy is called', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('of no blogs is zero', () => {
    expect(listHelper.totalLikes([])).toEqual(0)
  })

  test('of one blog is the likes of the blog itself', () => {
    const blog = {
      title: 'Joku',
      author: 'Jaska',
      url: 'jossain',
      likes: 3
    }
    expect(listHelper.totalLikes([blog])).toEqual(3)
  })

  test('of multiple blogs is correct', () => {
    expect(listHelper.totalLikes(blogs)).toEqual(36)
  })
})

describe('favoriteBlog', () => {

  test('of an empty array is null', () => {
    expect(listHelper.favoriteBlog([])).toBeNull()
  })

  test('of one blog is the blog itself', () => {
    expect(listHelper.favoriteBlog([blogs[3]])).toEqual(blogs[3])
  })

  test('of multiple blogs is determined correctly', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })

})

describe('mostBlogs', () => {

  test('of an empty array is null', () => {
    expect(listHelper.mostBlogs([])).toBeNull()
  })

  test('of a single blog returns that author with count of one', () => {
    expect(listHelper.mostBlogs([blogs[1]])).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of multiple blogs returns the correct author and count', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('mostLikes', () => {

  test('of an empty array is null', () => {
    expect(listHelper.mostLikes([])).toBeNull()
  })

  test('of a single blog returns that author with the blog likes', () => {
    expect(listHelper.mostLikes([blogs[1]])).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of multiple blogs returns the correct author and count', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})