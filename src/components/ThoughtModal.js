import React, { Component } from 'react'
import ThoughtEditor from './ThoughtEditor'
import axios from 'axios'

export default class ThoughtModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			thought: {},
			thoughtInput: '',
			titleInput: '',
			belief: null,
			belief_amt: null,
			quote: false,
			color: null,
			is_private: false,
		}
	}

	componentDidMount() {
		this.thoughtInput.focus()
		const { thought } = this.props
		if (this.props.match.params.id !== 'new') {
			this.setState({
				thought,
				thoughtInput: thought.thought,
				titleInput: thought.title,
				belief: thought.belief,
				belief_amt: thought.belief_amt,
				quote: thought.quote,
				color: thought.color,
				is_private: thought.is_private
			})
		}
	}

	clearModal = () => {
		const { thoughtInput, titleInput, belief, belief_amt, quote, color, is_private } = this.state
		let date
		if (this.props.match.params.id !== 'new') date = this.state.thought.date
		else {
			let today = new Date(Date.now())
			let month = today.getMonth() + 1
			let day = today.getDate()
			let year = today.getFullYear()
			date = `${month}/${day}/${year}`
		}
		let thought = {
			date,
			thought: thoughtInput,
			title: titleInput,
			belief,
			belief_amt,
			quote,
			color,
			is_private
		}
		if (this.props.match.params.id !== 'new') thought.thought_id = this.state.thought.thought_id
		this.props.removeModal(thought)
	}

	stopPropagation = (e) => {
		e.stopPropagation()
	}

	inputTitle = (e) => {
		this.setState({ titleInput: e.target.value })
	}

	inputThought = (e) => {
		this.setState({ thoughtInput: e.target.value })
	}

	changeColor = (color) => {
		this.setState({ color })
	}

	isPrivate = () => {
		this.setState({ is_private: !this.state.is_private })
	}

	render() {
		console.log(this.state)
		return (
			<div className='modalBackground' onClick={this.clearModal}>
				<ThoughtEditor {...this.props} stopPropagation={this.stopPropagation} changeColor={this.changeColor} isPrivate={this.isPrivate} />
				<div className="ThoughtModal" onClick={this.stopPropagation} autoFocus style={{ background: this.state.color }}>
					<input className='titleInput' placeholder='Title' value={this.state.titleInput} onChange={this.inputTitle} style={{ background: this.state.color }} />
					<textarea className='mainTextArea' value={this.state.thoughtInput} onChange={this.inputThought} ref={input => this.thoughtInput = input} style={{ background: this.state.color }} />
				</div>
			</div>
		)
	}
}