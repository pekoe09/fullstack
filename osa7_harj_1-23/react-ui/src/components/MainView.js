import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Users from './Users'

const MainView = ({ name, blogs, user, formVisible, title, author, url, handleLogout,
  handleChange, handleSubmit, toggleBlogForm, handleLike, handleDelete, users }) => {
  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      <div style={showWhenVisible}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <button onClick={toggleBlogForm} style={{ margin: 10 }}>Hide form</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleBlogForm} style={{ margin: 10 }}>Show form</button>
      </div>
      <Route exact path='/users' render={() =>
        <Users users={users} />
      } />
      <Route exact path='/' render={() =>
        <div>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          )}
        </div>
      } />
    </div>
  )
}

export default MainView

MainView.propTypes = {
  name: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  formVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
}