import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Container>
          <App />
        </Container>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)