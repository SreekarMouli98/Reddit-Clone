import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Button, 
} from 'reactstrap'

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            dob: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)   
        this.handleSubmit = this.handleSubmit.bind(this)   
    }

    signupSuccess(context, json) {
        console.log('signup success')
        localStorage.setItem('token', json.token)
        context.toggleLoggedIn()
        context.toggleSignupModal()
        context.setUsername(this.state.username)
        context.setUserId(json.id)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(context) {
        let json = {
            user: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            },
            dob: this.state.dob,
            karma: this.state.karma,
            username: this.state.username
        }
        json = JSON.stringify(json)
        fetch(`/api/reddit/u/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json,
        })
        .then(response => {
            response.ok ?
                response.json().then(json => {
                    this.signupSuccess(context, json)
                })
                :
                console.log(response)
        })
    }

    render() {
        return (
            <Context.Consumer>
                { context => {
                    return (
                        <React.Fragment>
                            <Button color="lite" onClick={() => context.toggleSignupModal()}>Signup</Button>
                            <Modal isOpen={context.signupModalOpen} toggle={() => context.toggleSignupModal()}>
                                <ModalHeader toggle={() => context.toggleSignupModal()}></ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={(event) => {
                                        event.preventDefault()
                                        this.handleSubmit(context)
                                    }}>
                                        <FormGroup>
                                            <Input 
                                                id='firstname' 
                                                name='first_name'
                                                type='text' 
                                                value={this.state.first_name}
                                                placeholder='First Name' 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='lastname' 
                                                name='last_name'
                                                type='text' 
                                                value={this.state.last_name}
                                                placeholder='Last Name' 
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='username' 
                                                name='username'
                                                type='text' 
                                                value={this.state.username}
                                                placeholder='Username (no spaces)' 
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='email' 
                                                name='email'
                                                type='email' 
                                                value={this.state.email}
                                                placeholder='Email' 
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for='date' sm={4}>Date of birth</Label>
                                            <Col sm={8}>
                                                <Input 
                                                    id='date'
                                                    name='dob' 
                                                    type='date' 
                                                    value={this.state.dob}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='password'
                                                name='password' 
                                                type='password' 
                                                value={this.state.password}
                                                placeholder='Password' 
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col sm={{size:10, offset:9}}>
                                                <Button>
                                                    Signup
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </React.Fragment>
                    )}
                }
            </Context.Consumer>
        )
    }
}