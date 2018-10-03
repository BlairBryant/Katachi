import React, { Component } from 'react'
import axios from 'axios'

export default class ThoughtEditor extends Component {
	constructor(props) {
		super(props)

		this.state = {

		}
		this.colors = ['black', 'yellow', 'red', 'purple']
		this.colors2 = ['lightblue', 'teal', 'tan', 'gray']
	}

	stopPropagation = (e) => {
		this.props.stopPropagation(e)
	}

	deleteThought = () => {
		axios.delete(`/api/deletethought/${this.props.match.params.id}`)
		this.props.history.push('/home')
	}

	render() {
		let mappedColors = this.colors.map((color, i) =>
			<div className='selectColor' style={{ background: color }} onClick={() => this.props.changeColor(color)} key={i}></div>
		)
		let mappedColors2 = this.colors2.map((color, i) =>
			<div className='selectColor' style={{ background: color }} onClick={() => this.props.changeColor(color)} key={i}></div>
		)
		return (
			<div className='ThoughtEditor column align' onClick={this.stopPropagation}>
				<div className='row'>
					<button>Belief</button>
					<button>Question</button>
				</div>
				<h2>Color</h2>
				<div className='row'>
					{mappedColors}
				</div>
				<div className='row'>
					{mappedColors2}
				</div>
				<button onClick={this.props.isPrivate}>Private</button>
				{
					this.props.match.params.id !== 'new'
						?
						<button onClick={this.props.deleteThought}>Delete</button>
						:
						null
				}
			</div>
		)
	}
}