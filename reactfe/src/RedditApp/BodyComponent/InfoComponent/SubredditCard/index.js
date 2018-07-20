import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
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
import Context from '../../../../provider'
import DeleteTemplate from '../../ContentComponent/assets/DeleteTemplate'

class SubredditCard extends Component {
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
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>                        
                            <Card>
                                <CardHeader>
                                    {this.props.provide_link ? 
                                        <CardLink className='text-centered' onClick={()=>this.props.history.push(`/r/${this.props.name}/`)}>
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
                                            onClick={() => 
                                                this.props.history.push(`/r/${this.props.name}/edit/`)
                                            }
                                            block
                                        >
                                            EDIT
                                        </Button>
                                    }
                                    {this.props.can_delete && 
                                        <DeleteTemplate 
                                            title = {this.props.name}
                                            toDeleteURL = {`/api/reddit/r/${this.props.name}/`}
                                            successURL = {'/'}
                                        />
                                    }
                                    {this.props.ask_new_post &&
                                        <Button 
                                        color='primary'
                                            block
                                            onClick={() => {
                                                context.loggedIn === false ?
                                                    context.toggleLoginModal()
                                                :
                                                    this.props.history.push('/new/')
                                            }}
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
                                            )}
                                        </ListGroup>        
                                    </CardBody>
                                </Card>
                            }
                        </React.Fragment>   
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(SubredditCard)