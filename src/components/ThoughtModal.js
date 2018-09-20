import React, { Component } from 'react'
import ThoughtEditor from './ThoughtEditor';

export default class ThoughtModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			thought: {},
			thoughtInput: '',
			titleInput: '',
			color: null,
			belief: null,
			belief_amt: null,
			quote: false,
		}
	}

	componentDidMount() {
		this.thoughtInput.focus()
	}

	clearModal = () => {
		const { thoughtInput, titleInput, belief, belief_amt, quote, color } = this.state
		let today = new Date(Date.now())
		let month = today.getMonth() + 1
		let day = today.getDate()
		let year = today.getFullYear()
		let date = `${month}/${day}/${year}`
		console.log(date)
		let thought = {
			date,
			thought: thoughtInput,
			title: titleInput,
			belief,
			belief_amt,
			quote,
			color
		}
		this.props.toggleModal(thought)
	}

	stopPropagation = (e) => {
		e.stopPropagation()
	}

	inputTitle = (e) => {
		this.setState({ thoughtInput: e.target.value })
	}

	inputThought = (e) => {
		this.setState({ titleInput: e.target.value })
	}

	changeColor = (color) => {
		this.setState({ color })
	}


	render() {
		console.log(this.state)
		return (
			<div className='modalBackground' onClick={this.clearModal}>
				<ThoughtEditor stopPropagation={this.stopPropagation} changeColor={this.changeColor} />
				<div className="ThoughtModal" onClick={this.stopPropagation} autoFocus style={{ background: this.state.color }}>
					<input className='titleInput' placeholder='Title' onChange={this.inputTitle} style={{ background: this.state.color }} />
					<textarea className='mainTextArea' onChange={this.inputThought} ref={input => this.thoughtInput = input} style={{ background: this.state.thoughtColor }} />
				</div>
			</div>
		)
	}
}