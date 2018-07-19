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

class SignupSuccess extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            {console.log('signup success')}
                            {context.toggleLoggedIn()}
                            {context.toggleSignupModal()}
                            {context.username = this.props.username}
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

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
            signup_successful: false,
        }
        this.handle_change = this.handle_change.bind(this)   
        this.handle_submit = this.handle_submit.bind(this)   
    }

    handle_change(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handle_submit(event) {
        event.preventDefault()
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
        .then(res => {
            res.status > 200 && res.status < 300 ?
                this.setState({signup_successful: true,})
            :
                console.log('Something went wrong!')
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <Context.Consumer>
                { context => {
                    return (
                        <React.Fragment>
                            <Button color="lite" onClick={() => context.toggleSignupModal()}>Signup</Button>
                            {this.state.signup_successful &&
                                <SignupSuccess username={this.state.username}/>
                            }
                            <Modal isOpen={context.signupModalOpen} toggle={() => context.toggleSignupModal()}>
                                <ModalHeader toggle={() => context.toggleSignupModal()}></ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.handle_submit}>
                                        <FormGroup>
                                            <Input 
                                                id='firstname' 
                                                name='first_name'
                                                type='text' 
                                                value={this.state.first_name}
                                                placeholder='First Name' 
                                                onChange={this.handle_change}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='lastname' 
                                                name='last_name'
                                                type='text' 
                                                value={this.state.last_name}
                                                placeholder='Last Name' 
                                                onChange={this.handle_change}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                id='username' 
                                                name='username'
                                                type='text' 
                                                value={this.state.username}
                                                placeholder='Username' 
                                                onChange={this.handle_change}
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
                                                onChange={this.handle_change}
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
                                                    onChange={this.handle_change}
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
                                                onChange={this.handle_change}
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