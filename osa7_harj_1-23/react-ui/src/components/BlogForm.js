import React from 'react'
import { connect } from 'react-redux'
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
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>title</td>
                <td>
                  <input
                    name='title'
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>author</td>
                <td>
                  <input
                    name='author'
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>url</td>
                <td>
                  <input
                    name='url'
                    value={this.state.url}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createBlog, setNotification }
)(BlogForm)