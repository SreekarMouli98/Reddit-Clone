import React, {Component} from 'react'
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import NavbarComponent from './NavbarComponent'
import TabComponent from './TabComponent'
import Context from '../../provider'
import './style.css'

export default class HeaderComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container className='vert-align'>
                            <Row><Col><NavbarComponent ctx={context}/></Col></Row>
                            <Row><Col><TabComponent /></Col></Row>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}
