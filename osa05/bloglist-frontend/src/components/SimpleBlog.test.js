import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: "Wrath of God",
            author: "God",
            likes: 665,
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={() => (1)} />)
        const titleDiv = simpleBlogComponent.find('.title')
        const contentDiv = simpleBlogComponent.find('.content')

        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })
    it('like is clicked', () => {
        const blog = {
            title: "Wrath of God",
            author: "God",
            likes: 665,
        }

        const mockHandler = jest.fn()
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
        const likeButton = simpleBlogComponent.find('button')
        likeButton.simulate('click')
        likeButton.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)

    })
})