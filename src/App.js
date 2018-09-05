import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'

export default class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
          {routes}
        </div>
      </Router>
    )
  }
}