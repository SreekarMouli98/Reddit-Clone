import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Form,
    FormGroup,
} from 'reactstrap'
import {
    withRouter
} from 'react-router'

class EditComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            content: '',
            votes: '',
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.update = this.update.bind(this)
        this.cancel = this.cancel.bind(this)    
        this.success = this.success.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            content: this.props.content,
            votes: this.props.votes,
        })
    }

    toggleModal() {
        this.setState(prev => ({
            modalOpen: !prev.modalOpen
        }))
    }

    success() {
        this.toggleModal()
        if (this.props.successURL) this.props.history.push(this.props.successURL)
    }

    update(event) {
        event.stopPropagation()
        event.preventDefault()
        let json = {
            content: this.state.content,
            votes: this.state.votes,
        }
        json = JSON.stringify(json)
        fetch(this.props.updateURL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: json
        })
        .then(response => {
            response.ok ? 
                    this.success()
                :
                console.log('Delete failed!', response)
        })
        
    }

    cancel(event) {
        event.stopPropagation()
        event.preventDefault()
        this.toggleModal()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <React.Fragment>
                <a
                    href='#'
                    className='black-text black-text-on-hover padding-all'
                    onClick={(event) => {
                        event.stopPropagation()
                        event.preventDefault()
                        this.toggleModal()
                    }}
                >
                    edit
                </a>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}a>
                    <ModalHeader toggle={this.cancel}></ModalHeader>
                    <ModalBody>
                        <Input 
                            type='text' 
                            name='content'
                            placeholder='Edit your Comment here!' 
                            value={this.state.content}
                            onChange={this.handleChange}
                            required
                        /> 
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.update}>DONE</Button>{' '}
                        <Button color="secondary" onClick={this.cancel}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withRouter(EditComment)