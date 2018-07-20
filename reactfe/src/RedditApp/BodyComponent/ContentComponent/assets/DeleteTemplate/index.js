import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import {
    withRouter
} from 'react-router'

class DeleteTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.delete = this.delete.bind(this)
        this.cancel = this.cancel.bind(this)    
        this.deleteSuccess = this.deleteSuccess.bind(this)
    }

    toggleModal() {
        this.setState(prev => ({
            modalOpen: !prev.modalOpen
        }))
    }

    deleteSuccess() {
        console.log('Delete Successful')
        this.toggleModal()
        if (this.props.successURL) this.props.history.push(this.props.successURL)

    }

    delete() {
        fetch(this.props.toDeleteURL, {
            method: 'DELETE',
        })
        .then(response => {
            response.ok ? 
                    this.deleteSuccess()
                :
                console.log('Delete failed!', response)
        })
        
    }

    cancel() {
        this.toggleModal()
    }

    render() {
        return (
            <React.Fragment>
                {this.props.button ?
                    this.props.block ? 
                        <Button color="danger" onClick={this.toggleModal} block>DELETE</Button>
                        :
                        <Button color="danger" onClick={this.toggleModal} >DELETE</Button>
                    :
                        <a
                            href='#'
                            className='black-text black-text-on-hover padding-all'
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                                this.toggleModal()
                            }}
                        >
                            delete
                        </a>
                }
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete? (can't undo this)
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.delete}>DELETE</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withRouter(DeleteTemplate)