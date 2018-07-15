import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import {
    withRouter
} from 'react-router'
import classnames from 'classnames'

class TabComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => (
                    <React.Fragment>
                        <Nav tabs color='primary'>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: context.activeTab === '1' })}
                                    onClick={() =>{
                                        context.toggleTab('1');
                                        this.props.history.push('/r/home/')
                                    }}
                                >
                                Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: context.activeTab === '2' })}
                                    onClick={() => {
                                        context.toggleTab('2');
                                        this.props.history.push('/r/popular/')
                                    }}
                                >
                                Popular
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: context.activeTab === '3' })}
                                    onClick={() => {
                                        context.toggleTab('3');
                                        this.props.history.push('/r/all/')
                                    }}
                                >
                                All
                                </NavLink>
                            </NavItem>                
                        </Nav>
                    </React.Fragment>
                )}
            </Context.Consumer>
        )
    }
}

export default withRouter(TabComponent)