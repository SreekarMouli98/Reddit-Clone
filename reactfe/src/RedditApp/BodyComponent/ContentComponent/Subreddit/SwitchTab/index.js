import React, {Component} from 'react'
import Context from '../../../../../provider'
import {
    Container,
    TabContent,
    TabPane,
} from "reactstrap";
import Home from './Home'
import Popular from './Popular'
import All from './All'

export default class SwitchTab extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <TabContent activeTab={context.activeTab}>
                                <TabPane tabId="1">
                                    <Home context={context}/>
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