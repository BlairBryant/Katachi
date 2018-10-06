import React, { Component } from 'react'
import ThoughtModal from './ThoughtModal'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
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
      this.sortThoughtsChronological(res)
    })
  }

  sortThoughtsChronological = (res) => {
    let chronologicalThoughts = []
    let currentDateGroup = []
    res.data.forEach((thought, i, arr) => {
      if (res.data.length === 1) chronologicalThoughts.push(thought)
      if (!currentDateGroup.length) {
        currentDateGroup.push(thought)
      }
      else {
        if (thought.date === currentDateGroup[0].date) {
          currentDateGroup.push(thought)
        }
        else {
          chronologicalThoughts.push(currentDateGroup)
          currentDateGroup = []
          currentDateGroup.push(thought)
          if (i === arr.length - 1) chronologicalThoughts.push(currentDateGroup)
        }
      }
      this.setState({ thoughts: res.data, chronologicalThoughts })
    })
  }

  //If a date on a thought is edited, I need to make it so that it automatically 
  //moves itself to the new appropriate location

  removeModal = (thought) => {
    if (thought.thought) {
      console.log(this.props.match.params.id)
      if (this.props.match.params.id !== 'new') {
        console.log(thought)
        axios.patch('/api/editthought', { thought }).then(res => {
          this.sortThoughtsChronological(res)
          this.setState({ modalToggle: !this.state.modalToggle }, () => this.props.history.push('/home'))
        })
        // this.setState({ modalToggle: !this.state.modalToggle }, () => this.props.history.push('/home'))
      } else {
        axios.post('/api/createthought', { thought })
        this.setState({ newestThought: thought, modalToggle: !this.state.modalToggle }, () => this.props.history.push('/home'))
      }
    } else {
      this.setState({ modalToggle: !this.state.modalToggle }, () => this.props.history.push('/home'))
    }
  }

  openThought = (thought) => {
    this.setState({ thought, modalToggle: true })
    this.props.history.push(`/home/${thought.thought_id}`)
  }

  mapChronoThoughts = (day) => {
    return day.map((thought, i) => (
      <div key={i} className='chronoThought' onClick={() => this.openThought(thought)}>
        <span>{thought.date}</span>
        <h3>{thought.title}</h3>
        <p>{thought.thought}</p>
      </div>
    ))
  }

  render() {
    console.log(this.state)
    let mappedThoughts = this.state.chronologicalThoughts.map((day, i) => (
      this.mapChronoThoughts(day)
    ))
    return (
      <div className='Home'>
        <div className='column align'>
          {mappedThoughts}
        </div>
        {
          this.state.modalToggle
            ?
            <Switch>
              <Route path='/home/:id' render={props => <ThoughtModal {...props} removeModal={this.removeModal} thought={this.state.thought} />} />
            </Switch>
            :
            null
        }
      </div>
    )
  }
}