import React, { Component } from 'react'
import ThoughtModal from './ThoughtModal'
import axios from 'axios'
import {Route, Switch} from 'react-router-dom'
//delet this later
import '../App.css'


export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      thought: {},
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
        if (res.data.length === 1) chronologicalThoughts.push(thought)
        if (!currentDateGroup.length) currentDateGroup.push(thought)
        else {
          if (thought.date === currentDateGroup[0].date) {
            currentDateGroup.push(thought)
          }
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

  removeModal = (thought) => {
    if (thought.thought) {
      axios.post('/api/createthought', {thought})
      this.setState({newestThought: thought, modalToggle: !this.state.modalToggle}, () => this.props.history.push('/home'))
    } else {
      this.setState({newestThought: thought, modalToggle: !this.state.modalToggle}, () => this.props.history.push('/home'))
    }
  }

  openThought = (thought) => {
    this.setState({thought, modalToggle: true})
    this.props.history.push(`/home/${thought.thought_id}`)
  }

  render() {
    console.log(this.state)
    let mappedThoughts = this.state.chronologicalThoughts.map((thought, i) => (
      <div key={i} onClick={() => this.openThought(thought)}>Thought</div>
    ))
    return (
      <div className='Home'>
        <div>
          {mappedThoughts}
          Heyo
        </div>
        {
          this.state.modalToggle
            ?
            <Switch>
              <Route path='/home/:id' render={props => <ThoughtModal {...props} removeModal={this.removeModal} thought={this.state.thought}/> } />
            </Switch>
            :
            null
        }
      </div>
    )
  }
}