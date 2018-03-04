import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const navBarStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'pink',
  padding: 5
}
const buttonStyle = {
  padding: 7,
  marginLeft: 5
}

const NavBar = ({ name, handleLogout }) => {
  return (
    <Menu>
      <Menu.Item>
        <NavLink to='/'>Blogs</NavLink> &nbsp;
      </Menu.Item>
      <Menu.Item>
        <NavLink to='/users'>Users</NavLink> &nbsp;
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <span><em>{name}</em> logged in</span>
          <Button size='mini' primary style={buttonStyle} onClick={handleLogout}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar