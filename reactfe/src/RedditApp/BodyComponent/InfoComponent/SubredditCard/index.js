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
} from 'reactstrap'
import {
    Redirect,
} from 'react-router-dom'

export default class SubredditCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribed: false
        }
    }

    toggleSubscribe() {
        this.setState(prev => ({
                subscribed: !prev.subscribed,
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        {this.props.provide_link ? 
                            <CardLink className='text-centered' href={'/r/' + this.props.name + '/'}>
                                <i className="fa fa-circle" aria-hidden="true"></i> {this.props.name}
                            </CardLink>
                            :
                            <CardText className='text-centered'>
                                <i className="fa fa-circle" aria-hidden="true"></i> {this.props.name}
                            </CardText>
                        }
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            {this.props.description}
                        </CardText>
                        {this.props.can_subscribe &&
                            <Button 
                                color={this.state.subscribed ? 'danger' : 'success'}
                                onClick={() => this.toggleSubscribe()}
                                block
                            >
                                {this.state.subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}
                            </Button>
                        }
                        {this.props.can_edit && 
                            <Button 
                                color='warning' 
                                block
                                onClick={() => window.location = `/r/${this.props.name}/edit/`}
                            >
                                EDIT
                            </Button>
                        }
                        {this.props.ask_new_post &&
                            <Button 
                                color='primary'
                                block
                                onClick={() => window.location = `/new/`}
                            >
                                NEW POST
                            </Button>  
                        }
                    </CardBody>
                </Card>
                {this.props.show_rules && 
                    <Card>
                        <CardHeader>RULES</CardHeader>
                        <CardBody>
                            <ListGroup>
                                {this.props.rules.map((rule) =>
                                        <ListGroupItem>{rule}</ListGroupItem>                                
                                    )
                                }
                            </ListGroup>
                        </CardBody>
                    </Card>
                }
            </React.Fragment>   
        )
    }
}