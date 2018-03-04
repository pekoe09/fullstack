import React from 'react'
import { connect } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Input } from 'semantic-ui-react'

class CommentForm extends React.Component {

  state = {
    comment: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleComment = async () => {
    try {
      const comment = {
        comment: this.state.comment
      }
      await this.props.commentBlog(comment, this.props.blog.id)
      this.setState({
        comment: ''
      })
      this.props.setNotification(`comment '${comment.comment}' added to blog ${this.props.blog.title}`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not comment the blog', 'error', 5)
    }
  }

  render() {
    const inputStyle = {
      width: '100%'
    }
    const inputContainerStyle = {
      overflow: 'hidden',
      paddingRight: 5
    }
    const buttonStyle = {
      float: 'right'
    }

    return (
      <div>
        <Button primary style={buttonStyle} onClick={this.handleComment}>add comment</Button>
        <div style={inputContainerStyle}>
          <Input
            name='comment'
            value={this.state.comment}
            onChange={this.handleChange}
            placeholder={'Write a comment!'}
            style={inputStyle}
          />
        </div>
      </div>
    )
  }

}

export default connect(
  null,
  {
    commentBlog,
    setNotification
  }
)(CommentForm)