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
            subscribers: [],
            subscribed: false
        }
    }

    getIds(json) {
        var ls = []
        if (json) {
            for (var i = 0; i < json.length; i++) {
                ls[i] = json[i]['id']
            }
        }
        return ls
    }

    setData(subscribers, context) {
        this.setState({
            subscribers: this.getIds(subscribers)
        }, () => {
            this.setState(prev => ({
                subscribed: context.loggedIn ? prev.subscribers.indexOf(context.userId) !== -1 : false
            }))
        })
    }

    componentDidMount() {
        this.setData(this.props.subscribers, this.props.context)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps.subscribers, nextProps.context)
    }

    toggleSubscription() {
        var subscribers = this.state.subscribers.concat()
        var subscribed = false
        var {userId} = this.props.context
        if (subscribers.indexOf(userId) !== -1) {
            subscribers.pop(userId)
            subscribed = false
        }
        else {
            subscribers.push(userId)
            subscribed = true
        }
        let json = {
            subscribers: subscribers
        }
        json = JSON.stringify(json)
        fetch(`/api/reddit/r/${this.props.name}/`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => {
            response.ok ?
                this.setState({
                    subscribers: subscribers,
                    subscribed: subscribed
                })
                :
                console.log(response)
        })
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
                                        <CardLink className='cursor-on-hover' onClick={()=>this.props.history.push(`/r/${this.props.name}/`)}>
                                            <i className="fa fa-circle" aria-hidden="true"></i> {this.props.name}
                                        </CardLink>
                                        :
                                        <CardText className='cursor-on-hover'>
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
                                            onClick={(event) => {
                                                context.loggedIn ? 
                                                    this.toggleSubscription()
                                                    :
                                                    context.toggleLoginModal()
                                            }}
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
                                            button={true}
                                            block={true}
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