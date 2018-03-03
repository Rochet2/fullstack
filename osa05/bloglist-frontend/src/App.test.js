import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
jest.mock('./services/login')
import loginService from './services/login'

describe('<App />', () => {
    let app

    describe('when not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        it('renders login form', () => {
            app.update()
            const loginForm = app.find(LoginForm)
            expect(loginForm.text()).toContain("Kirjaudu sovellukseen")
        })
        it('does not render blogs', () => {
            app.update()
            const blogs = app.find(Blogs)
            expect(blogs.exists()).toBe(false)
            const blog = app.find(Blog)
            expect(blog.exists()).toBe(false)
        })
    })

    describe('when logged in', () => {
        beforeEach(() => {
            localStorage.setItem('fullstackblogisovellususer', JSON.stringify(loginService.users.pertti))
            app = mount(<App />)
        })
        it('does not render login form', () => {
            app.update()
            const loginForm = app.find(LoginForm)
            expect(loginForm.exists()).toBe(false)
        })
        it('renders blogs', () => {
            app.update()
            const blogs = app.find(Blogs)
            expect(blogs.exists()).toBe(true)
            const blog = app.find(Blog)
            expect(blog.length).toBe(blogService.blogs.length)
        })
    })
})
