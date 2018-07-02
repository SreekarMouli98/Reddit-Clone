import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'

export default class LoginComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                { context => {
                    return (
                        <React.Fragment>
                            <Button color="info" onClick={() => context.toggleLoginModal()}>Login</Button>
                            <Modal isOpen={context.loginModalOpen} toggle={() => context.toggleLoginModal()}>
                                <ModalHeader toggle={() => context.toggleLoginModal()}></ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label for='username' sm={2}>Username</Label>
                                            <Col sm={10}><Input type='text' name='username' id='username' /></Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for='password' sm={2}>Password</Label>
                                            <Col sm={10}><Input type='password' name='password' id='password' /></Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={{size:10, offset:10}}>
                                                <Button color="primary" onClick={() => context.toggleLoginModal()}>Login</Button>{' '}
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <a href='/'>Unable to login?</a>
                                </ModalFooter>
                            </Modal>
                        </React.Fragment>
                    )}
                }
            </Context.Consumer>
        )
    }
}
