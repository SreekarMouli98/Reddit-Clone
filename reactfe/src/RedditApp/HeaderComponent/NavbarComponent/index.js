import React from 'react';
import Context from '../../../provider'
import {
    withRouter
} from 'react-router'
import {
    Navbar,
    NavbarBrand,
    Form,
    Input,
    InputGroup,
    Button,
    ButtonGroup
} from 'reactstrap';
import Login from './Login'
import Logout from './Logout'
import Signup from './Signup'
import Search from './Search'

class NavbarComponent extends React.Component {
    get_token() {
        return localStorage.getItem('token')
    }

    set_token(token) {
        localStorage.setItem('token', token)
    }
    
    remove_token() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    refresh_token(old_token, context) {
        fetch(`/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: old_token
            })
        })
        .then(response => {
            response.ok ?
                response.json()
                .then(json => {
                    this.set_token(json.token)
                    context.toggleLoggedIn()
                    context.setUserId(json.profile_id)
                    context.setUsername(json.profile_username)
                })
                :
                this.remove_token()
        })
    }

    componentDidMount() {
        var old_token = this.get_token()
        if (old_token) {
            this.refresh_token(old_token, this.props.ctx) 
        }
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Navbar light className='bg-light'>
                            <NavbarBrand
                                className='cursor-on-hover'
                                onClick={() =>
                                    this.props.history.push('/')
                                }
                                >
                                Reddit.alpha
                            </NavbarBrand>
                            <Form inline>
                                <InputGroup>
                                    <Search />
                                </InputGroup>
                                {context.loggedIn ?
                                    <InputGroup>
                                        <Button
                                            color='link'
                                            className='text-muted'
                                            onClick = {(event) => {
                                                event.preventDefault()
                                                this.props.history.push(`/u/${context.username}/`)
                                            }}
                                            >
                                            {context.username}
                                        </Button>
                                        <Logout />
                                    </InputGroup>
                                    :
                                    <ButtonGroup>
                                        <Login />
                                        <Signup />
                                    </ButtonGroup>
                                }
                            </Form>
                        </Navbar>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(NavbarComponent)