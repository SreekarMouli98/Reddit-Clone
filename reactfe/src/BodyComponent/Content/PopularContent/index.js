import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'
import CardComponent from '../../assets/CardComponent'

export default class PopularContent extends Component {
    render() {
        return (
            <React.Fragment>
                <Row><Col sm="12"><h1>Popular Content</h1></Col></Row>            
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