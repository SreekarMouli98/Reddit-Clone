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
import {
    withRouter,
} from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    loginSuccess(context, response) {
        console.log('Login Success!')
        localStorage.setItem('token', response.token)
        context.toggleLoginModal()
        context.toggleLoggedIn()
        context.setUsername(response.profile_username)
        context.setUserId(response.profile_id)
    }

    loginFail() {
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
        this.setState({
            username: '',
            password: ''
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(context) {
        let json = {
            username: this.state.username,
            password: this.state.password,
        }
        json = JSON.stringify(json)
        fetch(`/api/auth/token/`, {
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
                        this.loginSuccess(context, json) 
                    })
                    :
                    console.log(response)
                    this.loginFail()
        })
    }

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
                                    <Form
                                        onSubmit={(event)=>{
                                            event.preventDefault()
                                            this.handleSubmit(context)
                                        }}
                                    >
                                        <FormGroup row>
                                            <Label for='username' sm={2}>Username</Label>
                                            <Col sm={10}>
                                                <Input
                                                    id='username'
                                                    type='text' 
                                                    name='username'
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for='password' sm={2}>Password</Label>
                                            <Col sm={10}>
                                                <Input
                                                    id='password'
                                                    type='password'
                                                    name='password'
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={{size:10, offset:10}}>
                                                <Button 
                                                    color="primary" 
                                                >Login</Button>{' '}
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                {/* <ModalFooter>
                                    <div
                                        className = 'my-links'
                                        onClick = {() => {
                                            context.toggleLoginModal()
                                            this.props.history.push('/')
                                        }}
                                    >
                                        Unable to Login?
                                    </div>
                                </ModalFooter> */}
                            </Modal>
                        </React.Fragment>
                    )}
                }
            </Context.Consumer>
        )
    }
}

export default withRouter(Login)