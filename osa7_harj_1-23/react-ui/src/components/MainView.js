import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
        <Route exact path='/blogs/:id' render={(props) =>
          <Blog
            blog={this.blogById(props.match.params.id)}
            user={this.props.user}
            comment={this.props.comment}
            handleChange={this.props.handleChange}
            handleLike={this.props.handleLike}
            handleDelete={this.props.handleDelete}
            handleComment={this.props.handleComment}
          />
        } />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.users
  }
}

export default withRouter(connect(
  mapStateToProps
)(MainView))

MainView.propTypes = {
  name: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  formVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}