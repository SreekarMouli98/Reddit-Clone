import React from 'react';
import Context from '../provider'
import {
    Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import LoginComponent from './LoginComponent'

class HeaderComponent extends React.Component {
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
                                    <NavItem>
                                        {/* <Dropdown inNavbar isOpen={context.loginDropdownOpen} toggle={() => context.toggleLoginDropdown()}>
                                            <DropdownToggle tag="a" className="nav-link" caret>Login</DropdownToggle>
                                            <DropdownMenu>
                                                <Form inline>
                                                    <FormGroup>
                                                        <Label for="exampleUsername" hidden>Username</Label>
                                                        <Input type="text" name="username" id="exampleUsername" placeholder="Username" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="examplePassword" hidden>Password</Label>
                                                        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                                                    </FormGroup>
                                                    <DropdownItem divider />
                                                    <Button>Login</Button>
                                                </Form>
                                            </DropdownMenu>
                                        </Dropdown> */}
                                        <LoginComponent />
                                    </NavItem>
                                    <NavItem><NavLink href="/">Signup</NavLink></NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    )   
                }}
            </Context.Consumer>
        )
    }
}

export default HeaderComponent;