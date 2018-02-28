import React from 'react'

const Blog= ({ blog, user, handleLike, handleDelete }) => {
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
            <button onClick={handleLike}>like</button>
      </div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {!blog.user && <div>added by unknown</div>}
      {(!blog.user || blog.user.username === user.username)
        && <div><button onClick={handleDelete}>delete</button></div>
      }
    </div>
  )
}

export default Blog
