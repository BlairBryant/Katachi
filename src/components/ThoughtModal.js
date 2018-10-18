import React, { Component } from 'react'
import ThoughtEditor from './ThoughtEditor'

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
			categoryInput: '',
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
		this.props.removeModal(thought, this.props.match.params.id)
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

	togglePrivate = () => {
		this.setState({ is_private: !this.state.is_private })
	}

	toggleBelief = () => {
		if (this.state.belief) this.setState({ belief: null})
		else this.setState({ belief: true})
	}

	toggleQuestion = () => {
		if (this.state.belief === true || this.state.belief === null) this.setState({ belief: false})
		else this.setState({ belief: null})
	}

	inputCategory = (e) => {
		this.setState({categoryInput: e.target.value})
	}

	submitCategory = (e) => {
		if (this.state.categoryInput && e.key === 'Enter') {
			//Do something with the category input then this.setState({categoryInput: ''})

		} 		
	}

	render() {
		const {is_private, belief, titleInput, thoughtInput, color, categoryInput} = this.state
		const {clearModal, stopPropagation, toggleBelief, toggleQuestion, changeColor, togglePrivate, inputCategory, submitCategory, inputTitle, inputThought} = this
		return (
			<div className='modalBackground' onClick={clearModal}>
				<ThoughtEditor {...this.props} stopPropagation={stopPropagation} isBelief={belief} toggleBelief={toggleBelief} toggleQuestion={toggleQuestion} changeColor={changeColor} is_private={is_private} togglePrivate={togglePrivate} categoryInput={categoryInput} inputCategory={inputCategory} submitCategory={submitCategory}/>
				<div className="ThoughtModal" onClick={stopPropagation} autoFocus style={{ background: color }}>
					<input className='titleInput' placeholder='Title' value={titleInput} onChange={inputTitle} style={{ background: color }} />
					<textarea className='mainTextArea' value={thoughtInput} onChange={inputThought} ref={input => this.thoughtInput = input} style={{ background: color }} />
				</div>
			</div>
		)
	}
}