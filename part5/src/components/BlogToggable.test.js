/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogToggable from './BlogToggable'
import Blog from './Blog'

describe('</>', () => {
  let component
  const blog = [{
    author: 'Anhelina Kulakova',
    title: 'Component testing is done with react-testing-library',
    url: 'www/anhelina/com',
    likes: 100,
    user: {
      name: 'Anelina Kulakova'
    }
  }]
  const handleClick = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogToggable >
        <div className="testDiv" />
        <Blog blog={blog} handleLikesClick= {handleClick}/>
      </BlogToggable>
    )
  })
  // step 2
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


  // step 3
  test('calls onClick prop when clicked', () => {

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

})





