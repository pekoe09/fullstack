const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

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