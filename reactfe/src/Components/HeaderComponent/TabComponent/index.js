import React, {Component} from 'react'
import Context from '../../provider'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import classnames from 'classnames'

export default class TabComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => (
                    <Nav tabs color='primary'>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '1' })}
                                onClick={() => { context.toggleTab('1'); }}
                                // onClick={() => <Redirect to='/home/' /> }
                            >
                            Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '2' })}
                                onClick={() => { context.toggleTab('2'); }}
                                // onClick={() => <Redirect to='/popular/' /> }
                            >
                            Popular
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '3' })}
                                onClick={() => { context.toggleTab('3'); }}
                                // onClick={() => <Redirect to='/all/' /> }
                            >
                            All
                            </NavLink>
                        </NavItem>                
                    </Nav>
                )}
            </Context.Consumer>
        )
    }
}