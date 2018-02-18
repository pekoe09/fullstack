import React from 'react'
import { NavLink } from 'react-router-dom'

const navBarStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'pink',
  padding: 5
}

const NavBar = ({ name, handleLogout }) => {
  return (
    <div style={navBarStyle}>
      <NavLink to='/'>Blogs</NavLink> &nbsp;
      <NavLink to='/users'>Users</NavLink> &nbsp;
      <span><em>{name} logged in </em><button onClick={handleLogout}>logout</button></span>
    </div>
  )
}

export default NavBar