import React from 'react'
import MainView from './components/MainView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      error: null,
      blogFormVisible: false,
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
        user,
        message: `welcome to blog app, ${user.name}!`
      })
    } catch (exception) {
      this.setState({ error: 'username or password is invalid' })
    }
    this.fadeNotification()
  }

  logout = async (event) => {
    window.localStorage.clear()
    this.setState({
      user: null,
      message: 'thanks for using the blog app - see you soon!'
    })
    this.fadeNotification()
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
        message: `a new blog '${blog.title}' by ${blog.author} added`,
        title: '',
        author: '',
        url: ''
      })
    } catch (exception) {
      console.log(exception)
      this.setState({ error: 'could not create the blog' })
    }
    this.fadeNotification()
  }

  updateBlog = async (blog) => {
    try {
      await blogService.update(blog)
      const blogs = await blogService.getAll()
      this.setState({ blogs })
    } catch (exception) {
      console.log(exception)
      this.setState({ error: 'could not like the blog' })
      this.fadeNotification()
    }
  }

  toggleBlogForm = () => {
    const visible = !this.state.blogFormVisible
    this.setState({ blogFormVisible: visible })
  }

  fadeNotification = () => {
    setTimeout(() => {
      this.setState({ message: null, error: null })
    }, 5000);
  }

  render() {
    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />
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
            formVisible={this.state.blogFormVisible}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleLogout={this.logout}
            handleChange={this.handleFieldChange}
            handleSubmit={this.createBlog}
            toggleBlogForm={this.toggleBlogForm}
            handleLike={this.updateBlog}
          />
        }
      </div>
    );
  }
}

export default App;
