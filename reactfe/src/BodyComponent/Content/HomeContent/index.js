import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'
import CardComponent from '../../assets/CardComponent'

export default class HomeContent extends Component {
    render() {
        return (
            <React.Fragment>
                <Row><Col sm="12"><h1>Home Content</h1></Col></Row>            
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
                <Row><Col sm="12"><CardComponent /></Col></Row>
            </React.Fragment>
        )
    }
}