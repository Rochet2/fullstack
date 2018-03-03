import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('renders content', () => {
        const blog = {
            title: "Wrath of God",
            author: "God",
            url: "www.url.com",
            likes: 665,
            user: {
                name: "Pertti",
            },
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const titleDiv = blogComponent.find('.title')
        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)

        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.user.name)
    })
    it('expands on title click', () => {
        const blog = {
            title: "Wrath of God",
            author: "God",
            url: "www.url.com",
            likes: 665,
            user: {
                name: "Pertti",
            },
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const contentDivNotExpanded = blogComponent.find('.content')
        expect(contentDivNotExpanded.getElement().props.style).toEqual({ display: 'none' })

        const titleDiv = blogComponent.find('.title')
        titleDiv.simulate('click')

        const contentDivExpanded = blogComponent.find('.content')
        expect(contentDivExpanded.getElement().props.style).toEqual({ display: '' })
    })
})