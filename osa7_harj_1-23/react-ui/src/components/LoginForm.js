import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}