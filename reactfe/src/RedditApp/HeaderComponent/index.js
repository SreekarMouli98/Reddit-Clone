import React, {Component} from 'react'
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import NavbarComponent from './NavbarComponent'
import TabComponent from './TabComponent'
import './style.css'

export default class HeaderComponent extends Component {
    render() {
        return (
            <Container className='vert-align'>
                <Row><Col><NavbarComponent /></Col></Row>
                <Row><Col><TabComponent /></Col></Row>
            </Container>
        )
    }
}
