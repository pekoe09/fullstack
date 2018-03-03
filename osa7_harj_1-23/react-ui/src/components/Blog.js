import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

class Blog extends React.Component {

  handleLike = async () => {
    const likedBlog = {
      ...this.props.blog,
      likes: this.props.blog.likes + 1
    }
    try {
      this.props.likeBlog(likedBlog)
      this.props.setNotification(`updated likes on ${this.props.blog.title}`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not like the blog', 'error', 5)
    }
  }

  handleDelete = async () => {
    try {
      this.props.history.push('/')  
      await this.props.deleteBlog(this.props.blog.id)      
      this.props.setNotification(`deleted blog ${this.props.blog.title}`, 'success', 5)       
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not delete the blog', 'error', 5)
    }
  }

  render() {
    const blog = this.props.blog
    const user = this.props.user
    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes
            <button onClick={this.handleLike}>like</button>
        </div>
        {blog.user && <div>added by {blog.user.name}</div>}
        {!blog.user && <div>added by unknown</div>}
        {(!blog.user || blog.user.username === user.username)
          && <div><button onClick={this.handleDelete}>delete</button></div>
        }
        <h3>Comments</h3>
        <CommentForm
          blog={blog}
        />
        {blog.comments.length === 0
          ? <div>There are no comments yet</div>
          : <ul>{blog.comments.map(c => <li key={c}>{c}</li>)}</ul>
        }
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  {
    likeBlog,
    deleteBlog,
    setNotification
  }
)(Blog))
