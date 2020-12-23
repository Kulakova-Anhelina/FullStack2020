import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogToggable from './BlogToggable'
import Blog from './Blog'

describe('</>', () => {
  let component
  const blog = {
    author: 'Anhelina Kulakova',
    title: 'Component testing is done with react-testing-library',
    url: 'www/anhelina/com',
    likes: 100,
    user: {
      name: 'Anelina Kulakova'
    }
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogToggable buttonLabel="view" toggleVisibility={mockHandler} >
        <div className="testDiv" />
        <Blog blog={blog} />
      </BlogToggable>
    )
    component.debug()
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('toggled content', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('Anelina Kulakova', 'www/anhelina/com', 100)

  })

})

