let token = null
const blogs = [
  {
    id: '5a451df7571c224a31b5c8c1',
    title: 'Test blog 1',
    author: 'Test author 1',
    url: 'http://somewhere.co1m/',
    likes: 1,
    user: {
      id: '5a451df7571c224a31b5c8c4',
      username: 'testuser1',
      name: 'Test User 1'
    }
  },
  {
    id: '5a451df7571c224a31b5c8c2',
    title: 'Test blog 2',
    author: 'Test author 2',
    url: 'http://somewhere.com/2',
    likes: 1,
    user: {
      id: '5a451df7571c224a31b5c8c5',
      username: 'testuser2',
      name: 'Test User 2'
    }
  },
  {
    id: '5a451df7571c224a31b5c8c3',
    title: 'Test blog 3',
    author: 'Test author 3',
    url: 'http://somewhere.com/3',
    likes: 1,
    user: {
      id: '5a451df7571c224a31b5c8c6',
      username: 'testuser3',
      name: 'Test User 3'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }