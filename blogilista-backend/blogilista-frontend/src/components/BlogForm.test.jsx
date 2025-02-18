import '@testing-library/jest-dom/vitest'
import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('blog is created with correct arguments', async () => {
  let container

  const mockHandler = vi.fn()

  container = render(
    <BlogForm createBlog={mockHandler}/>
  ).container

  const titleInput = container.querySelector('#title-textbox')
  const authorInput = container.querySelector('#author-textbox')
  const urlInput = container.querySelector('#url-textbox')
  const saveButton = screen.getByText('Save')

  const user = userEvent.setup()

  await user.type(titleInput, 'test blog' )
  await user.type(authorInput, 'firstname lastname' )
  await user.type(urlInput, 'fullstackopen.com' )
  await userEvent.click(saveButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('test blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('firstname lastname')
  expect(mockHandler.mock.calls[0][0].url).toBe('fullstackopen.com')
})
