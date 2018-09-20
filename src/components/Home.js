import React, { Component } from 'react'
import TakeThought from './ThoughtModal'
import axios from 'axios'
//delet this later
import '../App.css'


export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      modalToggle: true,
      newestThought: {},
    }
  }

  toggleModal = (thought) => {
    if (thought.thought) {
      axios.post('/api/createthought', {thought})
      this.setState({newestThought: thought, modalToggle: !this.state.modalToggle})
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className='Home'>
        {
          this.state.modalToggle
            ?
            <TakeThought toggleModal={this.toggleModal}/>
            :
            null
        }
      </div>
    )
  }
}