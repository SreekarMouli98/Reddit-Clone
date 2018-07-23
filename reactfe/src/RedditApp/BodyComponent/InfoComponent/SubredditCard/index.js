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

    alreadySubscribed() {
        return this.state.subscribers.indexOf(this.props.context.userId) !== -1
    }

    subscribe() {
        return new Promise((resolve, reject) => {
            this.setState(prev => ({
                subscribers: prev.subscribers.concat(this.props.context.userId),
                subscribed: true
            }), () => {
                console.log('subscribed', this.state)
                return resolve()
            })
        })
    }

    unsubscribe() {
        return new Promise((resolve, reject) => {
            var new_subscribers = this.state.subscribers.concat()
            new_subscribers.pop(this.props.context.userId)
            this.setState({
                subscribers: new_subscribers,
                subscribed: false
            }, () => {
                console.log('unsubscribed', this.state)
                return resolve()
            })
        })
    }

    postSubscription() {
        return new Promise((resolve, reject) => {
            let json = {
                subscribers: this.state.subscribers
            }
            json = JSON.stringify(json)
            console.log(json)
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
                console.log('success')
                :
                console.log(response)
            })
            .then(() => {
                return resolve()
            })
        })
    }

    async toggleSubscription() {
        if (this.alreadySubscribed()) {
            await this.unsubscribe()
        }
        else {
            await this.subscribe()
        }
        await this.postSubscription()
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