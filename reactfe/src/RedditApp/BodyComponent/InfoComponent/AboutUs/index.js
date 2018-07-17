import React, {Component} from 'react'
import {
    Card,
    CardBody,
    CardText,
    CardLink,
} from 'reactstrap'
import './style.css'

export default class AboutUs extends Component {
    render() {
        return (
            <Card id='about-us'>
                <CardBody>
                    <CardText>A Reddit clone</CardText>
                    <CardText>
                        Created by
                        <CardLink id='my-name'> Sreekar Mouli. T</CardLink>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}