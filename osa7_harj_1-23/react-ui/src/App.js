import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MainView from './components/MainView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blogFormVisible: false,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      comment: ''
    }
  }

  componentDidMount = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }

    const blogs = await blogService.getAll()
    this.setState({ blogs })

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

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      await blogService.create(blog)
      const blogs = await blogService.getAll()
      this.setState({
        blogs,
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

  addComment = (id) => {
    return async () => {
      try {
        const comment = {
          comment: this.state.comment
        }
        const blog = await blogService.comment(comment, id)
        const blogs = await blogService.getAll()
        this.setState({
          blogs,
          comment: ''
        })
        console.log('Triggering comment notification')
        this.props.setNotification(`comment '${comment.comment}' added to blog ${blog.title}`, 'success', 5)
      } catch (exception) {
        console.log(exception)
        this.props.setNotification('could not comment the blog', 'error', 5)
      }
    }
  }

  updateBlog = async (blog) => {
    try {
      await blogService.update(blog)
      const blogs = await blogService.getAll()
      this.setState({
        blogs
      })
      this.props.setNotification(`updated likes on ${blog.title}`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      this.props.setNotification('could not like the blog', 'error', 5)
    }
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
                blogs={this.state.blogs}
                user={this.state.user}
                formVisible={this.state.blogFormVisible}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                comment={this.state.comment}
                handleLogout={this.logout}
                handleChange={this.handleFieldChange}
                handleSubmit={this.createBlog}
                handleComment={this.addComment}
                toggleBlogForm={this.toggleBlogForm}
                handleLike={this.updateBlog}
                handleDelete={this.deleteBlog}
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
    initializeUsers,
    setNotification
  }
)(App))
