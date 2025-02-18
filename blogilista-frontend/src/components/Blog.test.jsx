import '@testing-library/jest-dom/vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('"show" button', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        username: 'Admin'
      }
    }
    const user = {
      username: 'Admin',
    }

    container = render(
      <Blog blog={blog} user={user} />
    ).container
  })

  test('does not display all blog content at first', () => {
    const div = container.querySelector('.showBlogContent')
    expect(div).toHaveStyle('display:none')

  })

  test('displays all blog content after pressing "show" button', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)
    const div = container.querySelector('.showBlogContent')
    expect(div).not.toHaveStyle('display:none')
  })
})

describe('"like" button', () => {

  test('pressing "like" button twice calls function twice', async () => {
    let container

    const mockHandler = vi.fn()

    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        username: 'Admin'
      }
    }
    const blogUser = {
      username: 'Admin',
    }

    container = render(
      <Blog blog={blog} user={blogUser} updateBlog={mockHandler}/>
    ).container

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})