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

export default class InfoCardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {subscribed: false}
    }

    toggleSubscribe() {
        this.setState(prev => ({
                subscribed: !prev.subscribed,
            })
        )
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    {this.props.redditlink ? 
                        <CardLink className='text-centered' href={'/r/' + this.props.title + '/'}>
                            {this.props.user && <i class="fa fa-user-circle" aria-hidden="true"></i>}
                            {this.props.reddit && <i class="fa fa-circle" aria-hidden="true"></i>}
                            {' ' + this.props.title}
                        </CardLink>
                        :
                        <CardText className='text-centered'>
                            {this.props.user && <i class="fa fa-user-circle" aria-hidden="true"></i>}
                            {this.props.reddit && <i class="fa fa-circle" aria-hidden="true"></i>}
                            {' ' + this.props.title}
                        </CardText>
                    }
                </CardHeader>
                <CardBody>
                    {this.props.user &&
                        <ListGroup>
                            <ListGroupItem>
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                                {' D.O.B : '}
                                {this.props.dob}
                            </ListGroupItem>
                            <ListGroupItem>
                                <i class="fa fa-certificate" aria-hidden="true"></i>
                                {' Karma: '}
                                <Badge pill>{this.props.karma}</Badge>
                            </ListGroupItem>
                        </ListGroup>
                    }                 
                    {this.props.reddit &&
                        <React.Fragment>
                            <CardText>
                                {this.props.content}
                            </CardText>
                            {this.props.subscribe &&
                                <Button 
                                    color={this.state.subscribed ? 'danger' : 'success'}
                                    onClick={() => this.toggleSubscribe()}
                                    block
                                >{this.state.subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}</Button>
                            }
                        </React.Fragment>
                    } 
                    <Button color='primary' block>NEW POST</Button>
                </CardBody>
            </Card>            
        )
    }
}