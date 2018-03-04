import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class BlogListing extends React.Component {

  render() {
    const blogListingStyle = {
      listStyleType: 'none',
      backgroundColor: 'white',
      border: 'solid',
      borderWidth: 1,
      borderColor: '#b3ecff',
      marginBottom: 5,
      padding: 5
    }

    return (
      <div style={blogListingStyle} className='blog'>
        <div className='titleAuthor'>
          <NavLink to={`/blogs/${this.props.blog.id}`}>{this.props.blog.title} by {this.props.blog.author}</NavLink>
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