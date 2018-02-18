import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm'
import MainView from './components/MainView';

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders only the login form', () => {
      app.update()
      const blogComponents = app.find(Blog)
      const blogFormComponent = app.find(BlogForm)
      const mainViewComponent = app.find(MainView)
      const loginFormComponent = app.find(LoginForm)

      expect(blogComponents.length).toBe(0)
      expect(blogFormComponent.length).toBe(0)
      expect(mainViewComponent.length).toBe(0)
      expect(loginFormComponent.length).toBe(1)
    })

  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '123456',
        name: 'Testa Rossa'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('renders all blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)

    })

    it('does not render login form', () => {
      app.update()
      const loginFormComponent = app.find(LoginForm)
      expect(loginFormComponent.length).toBe(0)
    })
  })
})