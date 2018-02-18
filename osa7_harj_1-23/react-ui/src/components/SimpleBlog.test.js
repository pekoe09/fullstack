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

  it('clicking twice on like button calls event handler twice', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 7
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})