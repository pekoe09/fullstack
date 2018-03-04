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
import { loginUser, loadUser, clearLoggedUser } from './reducers/loggedUserReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogFormVisible: false,
      username: '',
      password: ''
    }
  }

  componentDidMount = async () => {
    await this.props.loadUser()
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await this.props.loginUser(this.state.username, this.state.password)
      this.setState({
        username: '',
        password: ''
      })
      this.props.setNotification(`welcome to blog app, ${this.props.user.name}!`, 'success', 5)
    } catch (exception) {
      this.props.setNotification('username or password is invalid', 'error', 5)
    }
  }

  logout = async (event) => {
    await this.props.clearLoggedUser()
    this.props.setNotification('thanks for using the blog app - see you soon!', 'success', 5)
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
            !this.props.user.username
              ? <LoginForm
                handleSubmit={this.login}
                handleChange={this.handleFieldChange}
                username={this.state.username}
                password={this.state.password}
              />
              : <MainView
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

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    initializeBlogs,
    initializeUsers,
    setNotification,
    loginUser,
    loadUser,
    clearLoggedUser
  }
)(App))
