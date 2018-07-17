import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    ListGroup,
    ListGroupItem,
    Badge,
} from 'reactstrap'
import {
    Redirect,
} from 'react-router-dom'

export default class UserCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <CardText className='text-centered' href={'/r/' + this.props.username + '/'}>
                        <i className="fa fa-user-circle" aria-hidden="true"></i> {this.props.username}
                    </CardText>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem>
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            {' D.O.B : '}
                            {this.props.dob}
                        </ListGroupItem>
                        <ListGroupItem>
                            <i className="fa fa-certificate" aria-hidden="true"></i>
                            {' Karma: '}
                            <Badge pill>{this.props.karma}</Badge>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>            
        )
    }
}