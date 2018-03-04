import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  const formStyle = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#b3ecff',
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  }

  return (
    <div style={formStyle}>
      <h2>Log in to blog app</h2>
      <Form size='small' onSubmit={handleSubmit}>
        <Form.Field required>
          <label>Username</label>
          <input
            name='username'
            value={username}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input
            name='password'
            value={password}
            onChange={handleChange}
            type='password'
          />
        </Form.Field>
        <Form.Field>
            <Button positive>Login</Button>
          </Form.Field>
      </Form>
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