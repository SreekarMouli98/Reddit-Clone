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

export default class InfoCard extends Component {
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
                    {this.props.new ?
                        <React.Fragment>{'Posting to Reddit'}</React.Fragment>
                        :
                        <React.Fragment>
                            {this.props.redditlink ? 
                                <CardLink className='text-centered' href={'/r/' + this.props.title + '/'}>
                                    {this.props.user && <i className="fa fa-user-circle" aria-hidden="true"></i>}
                                    {this.props.reddit && <i className="fa fa-circle" aria-hidden="true"></i>}
                                    {' ' + this.props.title}
                                </CardLink>
                                :
                                <CardText className='text-centered'>
                                    {this.props.user && <i className="fa fa-user-circle" aria-hidden="true"></i>}
                                    {this.props.reddit && <i className="fa fa-circle" aria-hidden="true"></i>}
                                    {' ' + this.props.title}
                                </CardText>
                            }
                        </React.Fragment>
                    }
                </CardHeader>
                <CardBody>
                    {this.props.new ? 
                        <React.Fragment>
                            <ListGroup>
                                <ListGroupItem>1. Choose Subreddit</ListGroupItem>
                                <ListGroupItem>2. Add Title and Content</ListGroupItem>
                            </ListGroup>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            {this.props.user &&
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
                            {this.props.newPostBtn &&
                                <a href='/new/' className='btn btn-primary btn-block'>NEW POST</a>
                            }
                        </React.Fragment>
                    }   
                </CardBody>
            </Card>            
        )
    }
}