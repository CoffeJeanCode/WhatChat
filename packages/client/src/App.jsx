import React from 'react'
import { Router, Route } from 'wouter'

import Join from './pages/Join'
import Chat from './pages/Chat'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path={'/'} component={Join} />
        <Route path="/chat/:room/:name" component={Chat} />
      </div>
    </Router>
  )
}

export default App
