import React, {Component} from 'react'
import NavbarComponent from './NavbarComponent'
import TabComponent from './TabComponent'
import {Row, Col, Container} from 'reactstrap'
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
