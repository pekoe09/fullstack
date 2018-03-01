import React from 'react'
import CommentForm from './CommentForm'

const Blog = ({ blog, user, comment,
   handleChange, handleLike, handleDelete, handleComment }) => {
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
      <h3>Comments</h3>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleComment={handleComment(blog.id)}
      />
      {blog.comments.length === 0
        ? <div>There are no comments yet</div>
        : <ul>{blog.comments.map(c => <li key={c}>{c}</li>)}</ul>
      }
    </div>
  )
}

export default Blog
