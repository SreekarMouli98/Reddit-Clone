import React, {Component} from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container} from 'reactstrap'
import Context from '../provider'
import TabComponent from './TabComponent'
import HomeContent from './Content/HomeContent'
import PopularContent from './Content/PopularContent'
import AllContent from './Content/AllContent'

class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <TabComponent />
                            <TabContent activeTab={context.activeTab}>
                                <TabPane tabId="1">
                                    <HomeContent />
                                </TabPane>
                                <TabPane tabId="2">
                                    <PopularContent />
                                </TabPane>
                                <TabPane tabId="3">
                                    <AllContent />
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