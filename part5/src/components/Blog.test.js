import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Anhelina Kulakova',
    title: 'Component testing is done with react-testing-library',
    url: 'www/anhelina/com',
    likes: 100
  }

  const component = render(
    <Blog blog={blog} />
  )
  component.debug()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
    'Anhelina Kulakova'
  )
  expect(div).not.toHaveTextContent(
    'www/anhelina/com',
    100
  )
})