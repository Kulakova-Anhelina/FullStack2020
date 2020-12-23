import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

//step 1
test('renders title, author', () => {
  const blog = [{
    author: 'Anhelina Kulakova',
    title: 'Component testing is done with react-testing-library',
    url: 'www/anhelina/com',
    likes: 100,
    user: {
      name: 'Anelina Kulakova'
    }
  }]
  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
    'Anhelina Kulakova'
  )
  expect(div).not.toHaveTextContent(
    'www/anhelina/com',
    100,
    'Anelina Kulakova'
  )
})
// step 2