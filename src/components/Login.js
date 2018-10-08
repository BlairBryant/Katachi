import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  inputEmail = (e) => {
    this.setState({email: e.target.value})
  }

  inputPassword = (e) => {
    this.setState({password: e.target.value})
  }

  register = () => {
    axios.post('/api/register', {email: this.state.email.toLowerCase(), password: this.state.password}).then(res => {
      console.log(res.data)
    })
  }

  login = () => {
    axios.put('/api/login', {email: this.state.email.toLowerCase(), password: this.state.password}).then(res => {
      if (res.data === 'success') this.props.history.push('/home/new')
    })
  }

  render() {
    return (
      <div className="Login">
        <h3>Username</h3>
        <input onChange={this.inputEmail} />
        <h3>Password</h3>
        <input onChange={this.inputPassword} type='password'/>
        <br /><br />
        <button onClick={this.register}>Sign up</button>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}