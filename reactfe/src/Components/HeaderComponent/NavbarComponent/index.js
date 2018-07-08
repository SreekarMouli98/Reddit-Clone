import React from 'react';
import Context from '../../provider'
import {
    Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import LoginComponent from './LoginComponent'
import SignupComponent from './SignupComponent'
import SignoutComponent from './SignoutComponent'

export default class NavbarComponent extends React.Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">Reddit</NavbarBrand>
                                <NavbarToggler onClick={() => context.toggleNavbar()} />
                                <Collapse isOpen={context.navbarOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {context.loggedIn ? 
                                        <React.Fragment>
                                            <NavItem><NavLink>{context.username}</NavLink></NavItem>
                                            <NavItem><SignoutComponent /></NavItem>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <NavItem><LoginComponent /></NavItem>
                                            <NavItem><SignupComponent /></NavItem>
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
