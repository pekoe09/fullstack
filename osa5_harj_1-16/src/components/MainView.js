import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'

const MainView = ({ name, blogs, user, formVisible, title, author, url, handleLogout,
  handleChange, handleSubmit, toggleBlogForm, handleLike, handleDelete }) => {
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
  )
}

export default MainView