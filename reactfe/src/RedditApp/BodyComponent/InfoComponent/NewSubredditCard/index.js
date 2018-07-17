import React, {Component} from 'react'
import {
    Card,
    CardBody,
    Button,
    CardText,
} from 'reactstrap'
import {
    Redirect,
} from 'react-router-dom'

export default class NewSubredditCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardText>Wanna have your own community? Create your own subreddit here!</CardText>
                    <Button color='primary' block onClick={() => window.location='/create/'}>CREATE SUBREDDIT</Button>
                </CardBody>
            </Card>
        )
    }
}