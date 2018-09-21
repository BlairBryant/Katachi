import React, { Component } from 'react'
import TakeThought from './ThoughtModal'
import axios from 'axios'
//delet this later
import '../App.css'


export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      thoughts: [],
      chronologicalThoughts: [],
      modalToggle: true,
      newestThought: {},
    }
  }

  componentDidMount() {
    axios.get('/api/getthoughts').then(res => {
      let chronologicalThoughts = []
      let currentDateGroup = []
      res.data.forEach((thought, i, arr) => {
        if (!currentDateGroup.length) currentDateGroup.push(thought)
        else {
          if (thought.date === currentDateGroup[0].date) currentDateGroup.push(thought)
          else {
            chronologicalThoughts.push(currentDateGroup)
            currentDateGroup = []
            currentDateGroup.push(thought)
          }
        }
      })
      
      this.setState({thoughts: res.data, chronologicalThoughts})
    })
  }

  //If a date on a thought is edited, I need to make it so that it automatically 
  //moves itself to the new appropriate location

  toggleModal = (thought) => {
    if (thought.thought) {
      axios.post('/api/createthought', {thought})
      this.setState({newestThought: thought, modalToggle: !this.state.modalToggle})
    } else {
      this.setState({newestThought: thought, modalToggle: !this.state.modalToggle})
    }
  }

  render() {
    console.log(this.state)
    let mappedThoughts = this.state.chronologicalThoughts.map((thought, i) => (
      <div>Thought</div>
    ))
    return (
      <div className='Home'>
        <div>
          {mappedThoughts}
        </div>
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