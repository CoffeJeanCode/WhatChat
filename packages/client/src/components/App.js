import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'wouter'
import '../styles/index.scss'
import { Join, Chat } from './components'

function App() {
  return (
    <Router>
      <div className="App">
        <Redirect from="/" to="/join" />
        <Route path="/join" component={Join} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  )
}

export default App
