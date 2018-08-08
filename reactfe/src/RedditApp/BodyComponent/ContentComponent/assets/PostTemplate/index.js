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
                votes: prev.upvotes.length - prev.downvotes.length
            }))
        })
    }

    componentDidMount() {
        this.setData(this.props.context, this.props.upvotes, this.props.downvotes)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps.context, nextProps.upvotes, nextProps.downvotes)
    }

    toggleUpvote() {
        var upvotes = this.state.upvotes.concat()
        var downvotes = this.state.downvotes.concat()
        var votes = this.state.votes
        var upvoted = false
        var downvoted = false
        var {userId} = this.props.context
        if (downvotes.indexOf(userId) !== -1) {
            downvotes.pop(userId)
            upvotes.push(userId)
            upvoted = true
            downvoted = false
            votes += 2
        }
        else if (upvotes.indexOf(userId) !== -1) {
            upvotes.pop(userId)
            upvoted = false
            votes -= 1
        }
        else {
            upvotes.push(userId)
            upvoted = true
            votes += 1
        }
        var json = {
            upvotes: upvotes,
            downvotes: downvotes
        }
        json = JSON.stringify(json)
        const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: json
        })
        .then(response => {
            response.ok ?
                this.setState({
                    upvotes: upvotes,
                    downvotes: downvotes,
                    upvoted: upvoted,
                    downvoted: downvoted,
                    votes: votes
                })
                :
                console.log(response)
        })
    }

    toggleDownvote() {
        var upvotes = this.state.upvotes.concat()
        var downvotes = this.state.downvotes.concat()
        var votes = this.state.votes
        var upvoted = false
        var downvoted = false
        var {userId} = this.props.context
        if (upvotes.indexOf(userId) !== -1) {
            upvotes.pop(userId)
            downvotes.push(userId)
            downvoted = true
            upvoted = false
            votes -= 2
        }
        else if (downvotes.indexOf(userId) !== -1) {
            downvotes.pop(userId)
            downvoted = false
            votes += 1
        }
        else {
            downvotes.push(userId)
            downvoted = true
            votes -= 1
        }
        var json = {
            upvotes: upvotes,
            downvotes: downvotes
        }
        json = JSON.stringify(json)
        const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: json
        })
        .then(response => {
            response.ok ?
                this.setState({
                    upvotes: upvotes,
                    downvotes: downvotes,
                    upvoted: upvoted,
                    downvoted: downvoted,
                    votes: votes
                })
                :
                console.log(response)
        })
    }

    get_time(def_time) {
        if (def_time !== undefined) {
            var date = def_time.split('-')
            var endin = date.pop()
            var time = endin.split('T')
            date.push(time[0])
            time = time[1].split(':')
            return `${time[0]}:${time[1]} on ${date[2]}-${date[1]}-${date[0]}`
        }
        else {
            return ''
        }
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
                                                    onClick={() => 
                                                        context.loggedIn ? 
                                                            this.toggleUpvote()
                                                            :
                                                            context.toggleLoginModal()
                                                    }
                                                ><i className="fa fa-arrow-up" aria-hidden="true"></i>
                                                </Button>
                                                <Button 
                                                    color={this.state.downvoted ? 'success' : 'light'}
                                                    onClick={() => 
                                                        context.loggedIn ?
                                                            this.toggleDownvote()
                                                            :
                                                            context.toggleLoginModal()
                                                    }
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
                                                <small>
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
                                                        {' Posted by '}
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
                                                </small>
                                                <small className='text-muted'>
                                                {` ${this.get_time(this.props.created_at)}`}
                                                </small>
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