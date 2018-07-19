import React from 'react';
import Context from '../../../provider'
import {
    withRouter
} from 'react-router'
import {
    Collapse,
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink,
} from 'reactstrap';
import Login from './Login'
import Logout from './Logout'
import Signup from './Signup'

class NavbarComponent extends React.Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Navbar color="light" light expand="md">
                            <NavbarBrand 
                                href='/'
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.props.history.push('/')
                                }}
                            >
                                Reddit
                            </NavbarBrand>
                            <NavbarToggler onClick={() => context.toggleNavbar()} />
                            <Collapse isOpen={context.navbarOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {context.loggedIn ? 
                                        <React.Fragment>
                                            <NavItem>
                                                <NavLink 
                                                    href='/'
                                                    onClick = {(event) => {
                                                        event.preventDefault()
                                                        this.props.history.push(`/u/${context.username}/`)
                                                    }}
                                                >
                                                    {context.username}
                                                </NavLink>
                                            </NavItem>
                                            <NavItem><Logout /></NavItem>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <NavItem><Login /></NavItem>
                                            <NavItem><Signup /></NavItem>
                                        </React.Fragment>
                                    }
                                </Nav>
                            </Collapse>
                        </Navbar>
                    )   
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(NavbarComponent)