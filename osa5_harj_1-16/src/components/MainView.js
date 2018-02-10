import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'

const MainView = ({ name, blogs, title, author, url, handleLogout, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default MainView