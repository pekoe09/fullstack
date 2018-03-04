import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

class BlogForm extends React.Component {
  state = {
    title: '',
    author: '',
    url: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      await this.props.createBlog(blog)

      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.setNotification(`a new blog '${blog.title}' by ${blog.author} added`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not create the blog', 'error', 5)
    }
  }

  render() {
    const formStyle = {
      border: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#b3ecff',
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={formStyle}>
        <h3>Create a new blog</h3>
        <Form size='small' onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>Title</label>
            <input
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Url</label>
            <input
              name='url'
              value={this.state.url}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Button positive>Create</Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { createBlog, setNotification }
)(BlogForm)