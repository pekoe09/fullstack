import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MainView from './components/MainView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogFormVisible: false,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }

    await this.props.initializeBlogs()
    await this.props.initializeUsers()
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })
      this.props.setNotification(`welcome to blog app, ${user.name}!`, 'success', 5)
    } catch (exception) {
      this.props.setNotification('username or password is invalid', 'error', 5)
    }
  }

  logout = async (event) => {
    window.localStorage.clear()
    this.setState({
      user: null
    })
    this.props.setNotification('thanks for using the blog app - see you soon!', 'success', 5)
  }

  deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      this.setState({
        blogs
      })
      this.props.setNotification(`deleted blog ${blog.title}`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not delete the blog', 'error', 5)
    }
  }

  toggleBlogForm = () => {
    const visible = !this.state.blogFormVisible
    this.setState({ blogFormVisible: visible })
  }


  render() {
    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />
        <div>
          {
            this.state.user === null ?
              <LoginForm
                handleSubmit={this.login}
                handleChange={this.handleFieldChange}
                username={this.state.username}
                password={this.state.password}
              />
              : <MainView
                name={this.state.user.name}
                user={this.state.user}
                formVisible={this.state.blogFormVisible}
                handleLogout={this.logout}
                toggleBlogForm={this.toggleBlogForm}
              />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  null,
  {
    initializeBlogs,
    initializeUsers,
    setNotification
  }
)(App))
