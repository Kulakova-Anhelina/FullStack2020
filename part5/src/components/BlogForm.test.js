import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


//step 4
test('create author', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: { value: 'Anhelina Kulakova' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Anhelina Kulakova')
})
