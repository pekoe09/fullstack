import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button } from 'semantic-ui-react'

const headerStyle = {
  marginTop: 20,
  color: 'navy'
}

const menuStyle = {
  backgroundColor: 'lightblue',
  padding: 10,
  fontFamily: 'sans-serif'
}

const navStyle = {
  textDecoration: 'none',
  padding: 10
}

const activeNavStyle = {
  backgroundColor: 'darkblue',
  color: 'white',
  textDecoration: 'none',
  padding: 10
}

const Menu = () => (
  <div style={menuStyle}>
    <NavLink exact style={navStyle} activeStyle={activeNavStyle} to='/'>anecdotes</NavLink>&nbsp;
    <NavLink exact style={navStyle} activeStyle={activeNavStyle} to='/create'>create new</NavLink>&nbsp;
    <NavLink exact style={navStyle} activeStyle={activeNavStyle} to='/about'>about</NavLink>&nbsp;
  </div>
)

const notificationStyle = {
  borderStyle: 'solid',
  borderColor: 'green',
  borderWidth: 1,
  borderRadius: 4,
  color: 'green',
  marginTop: 5,
  marginBottom: 5,
  padding: 10
}

const Notification = ({ notification }) => (
  <div>
    {
      notification &&
      <div style={notificationStyle}>
        {notification}
      </div>
    }
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2 style={headerStyle}>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2 style={headerStyle}>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const quoteStyle = {
  paddingLeft: 30,
  marginTop: 10,
  marginBottom: 10,
  fontStyle: 'italic',
  fontSize: 12
}

const About = () => (
  <div>
    <h2 style={headerStyle}>About anecdote app</h2>
    <Grid columns={16}>
      <Grid.Column width={12}>
        <p>According to Wikipedia:</p>

        <div style={quoteStyle}>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</div>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={4}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg"
          href="https://fi.wikipedia.org/wiki/Ada_Lovelace" />
      </Grid.Column>
    </Grid>
  </div>
)

const footerStyle = {
  marginTop: 10
}

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2 style={headerStyle}>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button primary>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote, "${anecdote.content}", created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path='/' render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path='/about' render={() =>
              <About />} />
            <Route path='/create' render={({ history }) =>
              <CreateNew addNew={this.addNew} history={history} />} />
            <Route exact path='/anecdotes' render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path='/anecdotes/:id' render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
