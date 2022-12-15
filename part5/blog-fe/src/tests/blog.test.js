import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

describe('<Blog />', () => {
  let component
  let sampleBlog = {
    title: 'Testing React Project With Jest',
    author: 'Jhon Doe',
    url: 'https://example.com/test',
    likes: 2,
    user: '6399973884caf1745624f0df',
  }

  let mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  beforeEach(() => {
    component = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
  })

  test('Blog displays Title & Author, but no Likes or URL', () => {
    expect(component.container).toHaveTextContent(sampleBlog.title)
    expect(component.container).toHaveTextContent(sampleBlog.author)
    expect(component.container).not.toHaveTextContent(sampleBlog.likes)
    expect(component.container).not.toHaveTextContent(sampleBlog.url)
  })

  test('Blog displays Likes & URL after click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(sampleBlog.likes)
    expect(component.container).toHaveTextContent(sampleBlog.url)
  })

  test('2 Click => 2 Times event called', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})