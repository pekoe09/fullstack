import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class BlogListing extends React.Component {

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} className='blog'>
        <div className='titleAuthor'>
          <NavLink to={`/blogs/${this.props.blog.id}`}>{this.props.blog.title} {this.props.blog.author}</NavLink>
        </div>
      </div>
    )
  }
}

export default BlogListing

BlogListing.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}