import React from 'react'
import { shallow } from 'enzyme'
import BlogListing from './BlogListing'

describe('<BlogListing />', () => {
  let blogComponent
  let blog

  beforeEach(() => {
    blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 7,
      url: 'Test url',
      user: { username: 'Testuser', name: 'Test user' }
    }
    const user = {
      username: 'Testuser'
    }
    const dummyHandler = () => { }

    blogComponent = shallow(<Blog
      blog={blog}
      user={user}
      handleLike={dummyHandler}
      handleDelete={dummyHandler}
    />)
  })

  it('renders only title and author when not expanded', () => {
    const blogDiv = blogComponent.find('.blog')
    const detailsDiv = blogComponent.find('.blogDetails')

    expect(blogDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(detailsDiv.getElement().props.style).toEqual({ display: 'none', paddingLeft: 10 })
  })

  it('shows blog details after clicking the title-author div', () => {
    const blogDiv = blogComponent.find('.blog')
    const titleAuthorDiv = blogComponent.find('.titleAuthor')
    titleAuthorDiv.simulate('click')

    const detailsDiv = blogComponent.find('.blogDetails')

    expect(detailsDiv.getElement().props.style).toEqual({ display: '', paddingLeft: 10 })
    expect(detailsDiv.text()).toContain(`${blog.likes} likes`)
    expect(detailsDiv.text()).toContain(`added by ${blog.user.name}`)
    expect(detailsDiv.text()).toContain(blog.url)
  })
})