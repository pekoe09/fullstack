import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.length > 0 ?
      <ul>
        {user.blogs.map(blog =>
          <li key={blog._id}>{blog.title} by {blog.author}</li>
        )}
      </ul>
      : <p>User has not added any blogs yet.</p>
      }
    </div>
  )
}

export default User