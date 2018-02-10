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
      user: null,
      title: '',
      author: '',
      url: ''
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
    window.localStorage.clear()
    this.setState({ user: null })
  }

  createBlog = async (event) => {
    event.preventDefault()
    console.log('Creating blog')
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
    } catch (exception) {
      console.log(exception)
    }

  }

  render() {
    return (
      <div>
        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
          : <MainView
            name={this.state.user.name}
            blogs={this.state.blogs}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleLogout={this.logout}
            handleChange={this.handleFieldChange}
            handleSubmit={this.createBlog}
          />
        }
      </div>
    );
  }
}

export default App;
