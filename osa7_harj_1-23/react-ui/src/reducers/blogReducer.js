import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'CREATE_BLOG':
      return store.concat(action.newBlog)
    case 'LIKE_BLOG':
      return store.map(b => b.id === action.likedBlog.id ? action.likedBlog : b)
    case 'DELETE_BLOG':
      return store.filter(b => b.id !== action.id)
    case 'COMMENT_BLOG':
      return store.map(b => b.id === action.commentedBlog.id ? action.commentedBlog : b)
    default:
      return store
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const commentBlog = (comment, id) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(comment, id)
    dispatch({
      type: 'COMMENT_BLOG',
      commentedBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      likedBlog
    })
  }
}

export default blogReducer