import React, {Component} from 'react';
import CardComponent from './CardComponent'
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import Context from '../provider';

class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
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
                        <TabContent activeTab={context.activeTab}>
                            <TabPane tabId="1">
                                <Row><Col sm="12"><CardComponent /></Col></Row>
                                <Row><Col sm="12"><CardComponent /></Col></Row>
                                <Row><Col sm="12"><CardComponent /></Col></Row>
                                <Row><Col sm="12"><CardComponent /></Col></Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <h4>In Popular</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <h4>In All</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>    
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default BodyComponent;   