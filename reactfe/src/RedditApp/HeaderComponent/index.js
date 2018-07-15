import React, {Component} from 'react'
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import {
    BrowserRouter
} from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import TabComponent from './TabComponent'
import './style.css'

export default class HeaderComponent extends Component {
    render() {
        return (
            <BrowserRouter>
                <Container className='vert-align'>
                    <Row><Col><NavbarComponent /></Col></Row>
                    <Row><Col><TabComponent /></Col></Row>
                </Container>
            </BrowserRouter>
        )
    }
}
