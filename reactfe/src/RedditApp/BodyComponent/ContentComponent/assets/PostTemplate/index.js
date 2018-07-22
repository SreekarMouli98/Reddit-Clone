import React, {Component} from 'react';
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    Table,
    Button,
    ButtonGroup,
} from 'reactstrap'
import Context from '../../../../../provider'
import './style.css'
import DeleteTemplate from '../DeleteTemplate'

class PostTemplate extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            upvotes: [],
            downvotes: [],
            upvoted: false,
            downvoted: false,
            votes: 0,
        }
    }

    getIds(json) {
        var ls = []
        if (json) {
            for (var i = 0; i<json.length; i++) {
                ls.push(json[i]['id'])
            }
        }
        return ls
    }
    
    setData(context, upvotes, downvotes) {
        this.setState({
            upvotes: this.getIds(upvotes),
            downvotes: this.getIds(downvotes)
        }, () => {
            this.setState(prev => ({
                upvoted: prev.upvotes.indexOf(context.userId) !== -1 && context.loggedIn,
                downvoted: prev.downvotes.indexOf(context.userId) !== -1  && context.loggedIn,
                votes: prev.upvotes.length - prev.downvotes.length,
            }))
        })
    }

    componentDidMount() {
        this.setData(this.props.context, this.props.upvotes, this.props.downvotes)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps.context, nextProps.upvotes, nextProps.downvotes)
    }

    alreadyUpvoted() {
        return this.state.upvotes.indexOf(this.props.context.userId) !== -1
    }

    alreadyDownvoted() {
        return this.state.downvotes.indexOf(this.props.context.userId) !== -1
    }

    addUpvote() {
        return new Promise((resolve, reject) => {
            this.setState(prev => ({
                upvotes: prev.upvotes.concat(this.props.context.userId),
                upvoted: true,
                votes: prev.votes + 1,
            }), () => {
                return resolve()
            })
        })
    }

    removeUpvote() {
        return new Promise((resolve, reject) => {
            var new_upvotes = this.state.upvotes.concat()
            new_upvotes.pop(this.props.context.userId)
            this.setState(prev => ({
                upvotes: new_upvotes,
                upvoted: false,
                votes: prev.votes - 1,
            }), () => {
                return resolve()
            })
        })
    }

    addDownvote() {
        return new Promise((resolve, reject) => {
            this.setState(prev => ({
                downvotes: prev.downvotes.concat(this.props.context.userId),
                downvoted: true,
                votes: prev.votes - 1,
            }), () => {
                return resolve()
            })
        })
    }

    removeDownvote() {
        return new Promise((resolve, reject) => {
            var new_downvotes = this.state.downvotes.concat()
            new_downvotes.pop(this.props.context.userId)
            this.setState(prev => ({
                downvotes: new_downvotes,
                downvoted: false,
                votes: prev.votes + 1,
            }), () => {
                return resolve()
            })
        })
    }

    postVotesData() {
        return new Promise((resolve, reject) => {
            var json = {
                upvotes: this.state.upvotes,
                downvotes: this.state.downvotes
            }
            json = JSON.stringify(json)
            const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`
            fetch(url, {
                method: 'PUT',
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
        })
    }

    async toggleUpvote() {
        if (this.alreadyDownvoted()) {
            await this.removeDownvote()
            await this.addUpvote()
        }
        else if (this.alreadyUpvoted()) {
            await this.removeUpvote()
        }
        else {
            await this.addUpvote()
        }
        await this.postVotesData()
    }

    async toggleDownvote() {
        if (this.alreadyUpvoted()) {
            await this.removeUpvote()
            await this.addDownvote()
        }
        else if(this.alreadyDownvoted()) {
            await this.removeDownvote()
        }
        else {
            await this.addDownvote()
        }
        await this.postVotesData()
    }

    render() {
        var {clickable} = this.props
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Table borderless>
                            <tbody>
                                <tr>
                                    {this.props.can_vote &&  
                                        <td className='fixed-width'>
                                            <ButtonGroup vertical>
                                                <Button 
                                                    color={this.state.upvoted ? 'success' : 'light'} 
                                                    onClick={() => this.toggleUpvote()}
                                                ><i className="fa fa-arrow-up" aria-hidden="true"></i>
                                                </Button>
                                                <Button 
                                                    color={this.state.downvoted ? 'success' : 'light'}
                                                    onClick={() => this.toggleDownvote()}
                                                ><i className="fa fa-arrow-down" aria-hidden="true"></i>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    }
                                    <td rowSpan='3'>
                                        <Card
                                            className={clickable ? 'cursor-on-hover' : ''}
                                            onClick={() => {
                                                if (clickable) {
                                                    context.toggleTab('4')
                                                    this.props.history.push(`/r/${this.props.subreddit}/post/${this.props.postid}/`)
                                                }
                                            }}
                                        >
                                            <CardBody>
                                                <CardTitle>
                                                    <CardText>
                                                        {this.props.title}
                                                        <small className='text-muted'>  {this.state.votes} vote(s)</small>
                                                    </CardText>
                                                </CardTitle>
                                                <CardText>{this.props.content}</CardText>
                                                {this.props.subredditlink && 
                                                    <a
                                                        href='/'
                                                        onClick = {(event) => {
                                                            event.stopPropagation()
                                                            event.preventDefault()
                                                            context.toggleTab('4')
                                                            this.props.history.push(`/r/${this.props.subreddit}/`)
                                                        }}
                                                    >
                                                        {'r/' + this.props.subreddit}
                                                    </a>
                                                }
                                                { this.props.userlink &&
                                                    <div>
                                                        {'Posted by '}
                                                        <a
                                                            className='black-text black-text-on-hover'
                                                            href='/'
                                                            onClick = {(event) => {
                                                                event.stopPropagation()
                                                                event.preventDefault()
                                                                context.toggleTab('4')
                                                                this.props.history.push(`/u/${this.props.username}/`)
                                                            }}
                                                        >
                                                            {this.props.username}
                                                        </a>
                                                    </div> 
                                                }
                                            </CardBody>
                                            {(this.props.can_edit || this.props.can_delete) &&
                                                <CardFooter>
                                                    {this.props.can_edit &&
                                                        <a
                                                            href='#'
                                                            className='black-text black-text-on-hover padding-all'
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                event.preventDefault()
                                                                this.props.history.push(`/r/${this.props.subreddit}/post/${this.props.postid}/edit/`)
                                                            }}
                                                            >
                                                                edit
                                                            </a>
                                                    }
                                                    {this.props.can_delete &&
                                                        <DeleteTemplate
                                                            onClick={(event) => event.preventDefault()}
                                                            toDeleteURL={`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`}
                                                            successURL={`/r/${this.props.subreddit}/`}
                                                        />
                                                    }
                                                </CardFooter>
                                            }
                                        </Card>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(PostTemplate)