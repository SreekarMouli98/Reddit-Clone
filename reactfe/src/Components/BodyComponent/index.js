import React, {Component} from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container} from 'reactstrap'
import Context from '../provider'
import Home from './Content/Home'
import Popular from './Content/Popular'
import All from './Content/All'

class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <TabContent activeTab={context.activeTab}>
                                <TabPane tabId="1">
                                    <Home />
                                </TabPane>
                                <TabPane tabId="2">
                                    <Popular />
                                </TabPane>
                                <TabPane tabId="3">
                                    <All />
                                </TabPane>
                            </TabContent>   
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default BodyComponent;   