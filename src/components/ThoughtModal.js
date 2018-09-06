import React, { Component } from 'react'
import ThoughtEditor from './ThoughtEditor';

export default class ThoughtModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thoughtInput: '',
            titleInput: '',
        }
    }

    componentDidMount() {
        this.thoughtInput.focus()
    }

    clearModal = () => {
        this.props.toggleModal(this.state.titleInput, this.state.thoughtInput)
    }

    stopPropagation = (e) => {
        e.stopPropagation()
    }

    inputTitle = (e) => {
        this.setState({thoughtInput: e.target.value})
    }
    
    inputThought = (e) => {
        this.setState({titleInput: e.target.value})
    }

    render() {
        return (
            <div className='modalBackground' onClick={this.clearModal}>
                <ThoughtEditor stopPropagation={this.stopPropagation}/>
                <div className="ThoughtModal" onClick={this.stopPropagation} autoFocus>
                    <input className='titleInput' placeholder='Title' onChange={this.inputTitle}/>
                    <textarea className='mainTextArea' onChange={this.inputThought} ref={input => this.thoughtInput = input} onChange={this.inputTitle}/>
                </div>
            </div>
        )
    }
}