import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Label, Icon } from 'semantic-ui-react'
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
    const author = blog.author ? blog.author : 'unknown'
    const user = this.props.user
    const blogStyle = {
      border: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#b3ecff',
      backgroundColor: '#e6f9ff',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      padding: 10
    }
    const commentListStyle = {
      padding: 0
    }
    const commentStyle = {
      listStyleType: 'none',
      backgroundColor: 'white',
      border: 'solid',
      borderWidth: 1,
      borderColor: '#b3ecff',
      marginBottom: 5,
      padding: 5
    }
    const marginStyle = {
      marginTop: 5,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <h2>{blog.title} by {author}</h2>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div style={marginStyle}>
          <Button as='div' labelPosition='left'>
            <Label>{blog.likes} likes</Label>
            <Button icon positive onClick={this.handleLike}>
              <Icon name='heart' />
              {' Like'}
            </Button>
          </Button>
        </div>
        {blog.user && <div>added by {blog.user.name}</div>}
        {!blog.user && <div>added by unknown</div>}
        {(!blog.user || blog.user.username === user.username)
          &&
          <div>
            <Button negative size='mini' style={marginStyle} onClick={this.handleDelete}>Delete</Button>
          </div>
        }
        <h3>Comments</h3>
        <CommentForm
          blog={blog}
        />
        {blog.comments.length === 0
          ? <div>There are no comments yet</div>
          :
          <ul style={commentListStyle}>{blog.comments.map(c =>
            <li key={c} style={commentStyle}>{c}</li>)}
          </ul>
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
