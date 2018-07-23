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