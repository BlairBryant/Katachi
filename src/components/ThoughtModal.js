import React, { Component } from 'react'

export default class ThoughtModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thoughtInput: ''
        }
    }

    clearModal = () => {
        this.props.toggleModal(this.state.thoughtInput)
    }

    stopPropagation = (e) => {
        e.stopPropagation()
    }

    inputThought = (e) => {
        this.setState({thoughtInput: e.target.value})
    }

    render() {
        return (
            <div className='modalBackground' onClick={this.clearModal}>
                <div className="ThoughtModal" onClick={this.stopPropagation}>
                    <p>my thought</p>
                    <textarea className='mainTextArea' onChange={this.inputThought}/>
                </div>
            </div>
        )
    }
}