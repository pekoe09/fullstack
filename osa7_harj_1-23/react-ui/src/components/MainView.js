import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

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
    const buttonStyle = {
      marginBottom: 10
    }
    const blogListStyle = {
      border: 'solid',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#b3ecff',
      backgroundColor: '#e6f9ff',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      padding: 10
    }

    return (
      <div>
        <h2>Blog app</h2>
        <NavBar
          name={this.props.user ? this.props.user.name : ''}
          handleLogout={this.props.handleLogout}
        />
        <div style={showWhenVisible}>
          <BlogForm />
          <Button size='mini' style={buttonStyle} onClick={this.props.toggleBlogForm}>Hide form</Button>
        </div>
        <div style={hideWhenVisible}>
          <Button size='mini' style={buttonStyle} onClick={this.props.toggleBlogForm}>Show form</Button>
        </div>
        <Route exact path='/users' render={() =>
          <Users />
        } />
        <Route exact path='/users/:id' render={({ match }) =>
          <User user={this.userById(match.params.id)} />
        } />
        <Route exact path='/' render={() =>
          <div style={blogListStyle}>
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
    users: store.users,
    user: store.user
  }
}

export default withRouter(connect(
  mapStateToProps,
  { initializeBlogs, initializeUsers }
)(MainView))

MainView.propTypes = {
  formVisible: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired
}