import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Col, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
} from 'reactstrap'

export default class Signup extends Component {
    render() {
        return (
            <Context.Consumer>
                { context => {
                    return (
                        <React.Fragment>
                            <Button color="lite" onClick={() => context.toggleSignupModal()}>Signup</Button>
                            <Modal centered isOpen={context.signupModalOpen} toggle={() => context.toggleSignupModal()}>
                                <ModalHeader toggle={() => context.toggleSignupModal()}></ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup><Input type='text' name='firstname' id='firstname' placeholder='First Name' /></FormGroup>
                                        <FormGroup><Input type='text' name='lastname' id='lastname' placeholder='Last Name' /></FormGroup>
                                        <FormGroup><Input type='text' name='username' id='username' placeholder='Username' /></FormGroup>
                                        <FormGroup><Input type='email' name='email' id='email' placeholder='Email' /></FormGroup>
                                        <FormGroup row>
                                            <Label for='date' sm={4}>Date of birth</Label>
                                            <Col sm={8}><Input type='date' name='date' id='date' /></Col>
                                        </FormGroup>
                                        <FormGroup><Input type='password' name='password' id='password' placeholder='Password' /></FormGroup>
                                        <FormGroup row>
                                            <Col sm={{size:10, offset:9}}><Button>Signup</Button></Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                </ModalFooter>
                            </Modal>
                        </React.Fragment>
                    )}
                }
            </Context.Consumer>
        )
    }
}