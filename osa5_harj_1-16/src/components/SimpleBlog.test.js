import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content correctly', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 7
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAuthorDiv = blogComponent.find('.title-author')
    const likesDiv = blogComponent.find('.likes')

    expect(titleAuthorDiv.text()).toEqual(`${blog.title} ${blog.author}`)
    expect(likesDiv.text()).toEqual(`blog has ${blog.likes} likes`)
  })
})