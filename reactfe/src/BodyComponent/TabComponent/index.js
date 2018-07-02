import React, {Component} from 'react'
import Context from '../../provider'
import {Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames'

class TabComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => (
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '1' })}
                                onClick={() => { context.toggleTab('1'); }}
                            >
                            Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '2' })}
                                onClick={() => { context.toggleTab('2'); }}
                            >
                            Popular
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: context.activeTab === '3' })}
                                onClick={() => { context.toggleTab('3'); }}
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

export default TabComponent;