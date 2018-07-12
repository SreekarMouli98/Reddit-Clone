import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardLink,
} from 'reactstrap'

export default class CommentComponent extends Component {
    render() {
        return (
            <Card>
                <CardHeader><CardLink href={'/u/' + this.props.profile.username + '/'}>{this.props.profile.username}</CardLink> . {this.props.comment.votes} votes</CardHeader>
                <CardBody>
                    <CardText>{this.props.comment.content}</CardText>
                </CardBody>
            </Card>
        )
    }
}