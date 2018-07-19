import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    ListGroup,
    ListGroupItem,
    Badge,
} from 'reactstrap'

class UserCard extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    <CardText className='text-centered' onClick={()=>this.props.history.push(`/r/${this.props.username}/`)}>
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

export default withRouter(UserCard)