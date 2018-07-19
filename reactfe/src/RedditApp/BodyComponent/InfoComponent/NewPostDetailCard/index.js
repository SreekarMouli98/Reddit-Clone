import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    ListGroup,
    ListGroupItem,
} from 'reactstrap'

export default class NewPostDetailCard extends Component {
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