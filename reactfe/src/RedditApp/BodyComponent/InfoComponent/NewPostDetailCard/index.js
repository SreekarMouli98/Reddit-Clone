import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardLink,
    Button,
    ListGroup,
    ListGroupItem,
    Badge,
} from 'reactstrap'
import {
    Redirect,
} from 'react-router-dom'

export default class NewPostDetailCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <CardText>Posting To Reddit</CardText>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem>1. Choose Subreddit</ListGroupItem>
                        <ListGroupItem>2. Add Title and Content</ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>            
        )
    }
}