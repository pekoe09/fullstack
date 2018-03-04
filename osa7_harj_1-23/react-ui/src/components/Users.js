import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table width={6} striped collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><NavLink to={`/users/${user.id}`}>{user.name}</NavLink></Table.Cell>
              <Table.Cell textAlign='center'>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    users: store.users
  }
}

export default connect(
  mapStateToProps
)(Users)