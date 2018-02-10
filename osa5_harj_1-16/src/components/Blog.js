import React from 'react'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  likeBlog = () => {
    const blog = this.props.blog
    blog.likes += 1
    this.props.handleLike(blog)
  }

  render() {
    const showWhenExpanded = {
      display: this.state.expanded ? '' : 'none'
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blogDetailsStyle = {
      paddingLeft: 10
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleExpansion}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={{...showWhenExpanded, ...blogDetailsStyle}}>
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          <div>
            {this.props.blog.likes} likes
            <button onClick={this.likeBlog}>like</button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
        </div>
      </div>
    )
  }
}

export default Blog