import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import BlogForm from './BlogForm'
import Blog from './Blog'
import User from './User'
import Users from './Users'

class MainView extends React.Component {

  userById = (id) => {
    console.log(this.props.users)
    return this.props.users.find(user => user.id === id)
  }

  render() {

    const hideWhenVisible = { display: this.props.formVisible ? 'none' : '' }
    const showWhenVisible = { display: this.props.formVisible ? '' : 'none' }

    return (
      <div>
        <h2>blogs</h2>
        <p>{this.props.name} logged in <button onClick={this.props.handleLogout}>logout</button></p>
        <div style={showWhenVisible}>
          <BlogForm
            title={this.props.title}
            author={this.props.author}
            url={this.props.url}
            handleChange={this.props.handleChange}
            handleSubmit={this.props.handleSubmit}
          />
          <button onClick={this.props.toggleBlogForm} style={{ margin: 10 }}>Hide form</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={this.props.toggleBlogForm} style={{ margin: 10 }}>Show form</button>
        </div>
        <Route exact path='/users' render={() =>
          <Users users={this.props.users} />
        } />
        <Route exact path='/users/:id' render={({ match }) =>
          <User user={this.userById(match.params.id)} />
        } />
        <Route exact path='/' render={() =>
          <div>
            {this.props.blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={this.props.handleLike}
                handleDelete={this.props.handleDelete}
                user={this.props.user}
              />
            )}
          </div>
        } />
      </div>
    )
  }
}


export default MainView

MainView.propTypes = {
  name: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  formVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
}