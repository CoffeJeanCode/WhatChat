import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/Appnts/App'
import * as serviceWorker from './services/serviceWorker'
import './styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

if (import.meta.hot) {
  import.meta.hot.accept()
}

serviceWorker.register()
