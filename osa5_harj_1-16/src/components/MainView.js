import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'

const MainView = ({ name, blogs, formVisible, title, author, url, handleLogout,
  handleChange, handleSubmit, toggleBlogForm }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      {formVisible ?
        <div>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <button onClick={toggleBlogForm} style={{ margin: 10 }}>Hide form</button>
        </div>
        : <div><button onClick={toggleBlogForm} style={{ margin: 10 }}>Show form</button></div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default MainView