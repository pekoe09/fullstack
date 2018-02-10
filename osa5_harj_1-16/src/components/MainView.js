import React from 'react'
import Blog from './Blog'

const MainView = ({ name, blogs, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default MainView