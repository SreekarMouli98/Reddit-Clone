import React, {Component} from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap'
import {
    withRouter
} from 'react-router'
import Context from '../../../../../provider'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            new_password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    fetchUser(user) {
        fetch(`/api/reddit/u/${user}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                first_name: json.user.first_name,
                last_name: json.user.last_name,
                username: json.username,
                email: json.user.email,
                dob: json.dob,
                karma: json.karma,
                password: json.user.password,
            })
        })
    }

    componentDidMount() {
        if (this.props.context.loggedIn !== true) {
            this.props.history.push('/')
        }
        this.fetchUser(this.props.user)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.context.loggedIn !== true) {
            this.props.history.push('/')
        }
        this.fetchUser(nextProps.user)
    }

    success(context) {
        console.log('update succesful')
        context.setUsername(this.state.username)
        this.props.history.push(`/u/${this.state.username}/`)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(context) {
        let json = {
            user: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
            },
            dob: this.state.dob,
            karma: this.state.karma,
            username: this.state.username
        }
        if (this.state.new_password) {
            json.user['password'] = this.state.new_password 
        }
        json = JSON.stringify(json)
        fetch(`/api/reddit/u/${this.props.user}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: json,
        })
        .then(response => {
            response.ok ?
                response.json().then(json => this.success(context))
            :
                console.log(response)
        })
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Form 
                                onSubmit={(event) => {
                                    event.stopPropagation()
                                    event.preventDefault()
                                    this.handleSubmit(context)
                                }}
                            >
                                <FormGroup row>
                                    <Label sm={3}>First Name</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="text" 
                                            name='first_name'
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Last Name</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="text"
                                            name='last_name'
                                            value={this.state.last_name}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Email</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="email"
                                            name='email'
                                            value={this.state.email} 
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Username</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type='text' 
                                            name='username'
                                            value={this.state.username} 
                                            onChange={this.handleChange}
                                            placeholder='(no spaces)'
                                            required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Password</Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="password"
                                            name='new_password'
                                            placeholder="Enter new password" 
                                            value={this.state.new_password}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>
                                    <Label for="exampleFile" sm={2}>File</Label>
                                    <Col sm={10}>
                                        <Input type="file" name="file" id="exampleFile" />
                                        <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                        </FormText>
                                    </Col>
                                </FormGroup> */}
                                <FormGroup check row>
                                    <Button color='primary' block>UPDATE</Button>
                                </FormGroup>
                            </Form>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(EditProfile)