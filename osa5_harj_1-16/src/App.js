import React from 'react'
import MainView from './components/MainView'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    console.log('Logging in: ', this.state.username, this.state.password)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (exception) {
      this.setState({
        error: 'username or password is invalid'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    console.log('Logging out')
    window.localStorage.clear()
    this.setState({ user: null })
  }

  render() {
    return (
      <div>
        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
          : <MainView
            name={this.state.user.name}
            blogs={this.state.blogs}
            handleLogout={this.logout}
          />
        }
      </div>
    );
  }
}

export default App;
