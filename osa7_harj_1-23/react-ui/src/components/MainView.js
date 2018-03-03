import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import Blog from './Blog'
import BlogListing from './BlogListing'
import User from './User'
import Users from './Users'
import NavBar from './NavBar'

class MainView extends React.Component {

  userById = (id) => {
    return this.props.users.find(user => user.id === id)
  }

  blogById = (id) => {
    return this.props.blogs.find(b => b.id === id)
  }

  render() {

    const hideWhenVisible = { display: this.props.formVisible ? 'none' : '' }
    const showWhenVisible = { display: this.props.formVisible ? '' : 'none' }

    return (
      <div>
        <h2>blog app</h2>
        <NavBar name={this.props.name} handleLogout={this.props.handleLogout} />
        <div style={showWhenVisible}>
          <BlogForm />
          <button onClick={this.props.toggleBlogForm} style={{ margin: 10 }}>Hide form</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={this.props.toggleBlogForm} style={{ margin: 10 }}>Show form</button>
        </div>
        <Route exact path='/users' render={() =>
          <Users />
        } />
        <Route exact path='/users/:id' render={({ match }) =>
          <User user={this.userById(match.params.id)} />
        } />
        <Route exact path='/' render={() =>
          <div>
            {this.props.blogs.map(blog =>
              <BlogListing
                key={blog.id}
                blog={blog}
                user={this.props.user}
              />
            )}
          </div>
        } />
        <Route exact path='/blogs/:id' render={({ match, history }) =>
          <Blog
            blog={this.blogById(match.params.id)}
            user={this.props.user}
            history={history}
          />
        }
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    blogs: store.blogs,
    users: store.users
  }
}

export default withRouter(connect(
  mapStateToProps,
  { initializeBlogs, initializeUsers }
)(MainView))

MainView.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  formVisible: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired
}