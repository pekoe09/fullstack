import React from 'react'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>title</td>
              <td>
                <input
                  name='title'
                  value={title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>author</td>
              <td>
                <input
                  name='author'
                  value={author}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>url</td>
              <td>
                <input
                  name='url'
                  value={url}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm