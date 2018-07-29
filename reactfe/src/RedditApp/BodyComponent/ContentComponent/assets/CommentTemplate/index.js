import React, {Component} from 'react';
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    Table,
    Button,
    InputGroup,
    Row,
    Col,
} from 'reactstrap'
import Context from '../../../../../provider'
import DeleteTemplate from '../DeleteTemplate'
import EditComment from '../EditComment'


class CommentTemplate extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            upvotes: [],
            downvotes: [],
            upvoted: false,
            downvoted: false,
            votes: this.props.votes,
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
        const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/${this.props.commentid}/`
        fetch(url, {
            method: 'PATCH',
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
        const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/${this.props.commentid}/`
        fetch(url, {
            method: 'PATCH',
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

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Table borderless>
                            <tbody>
                                <tr>
                                    {this.props.can_vote &&  
                                        <td className='fixed-width'>
                                            <InputGroup>
                                                <Button 
                                                    color={this.state.upvoted ? 'success' : 'light'} 
                                                    onClick={() => 
                                                        context.loggedIn ?
                                                            this.toggleUpvote()
                                                            :
                                                            context.toggleLoginModal()
                                                    }
                                                >
                                                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                                                </Button>
                                                <Button 
                                                    color={this.state.downvoted ? 'success' : 'light'}
                                                    onClick={() => 
                                                        context.loggedIn ? 
                                                            this.toggleDownvote()
                                                            :
                                                            context.toggleLoginModal()
                                                    }
                                                >
                                                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                                                </Button>
                                            </InputGroup>
                                        </td>
                                    }
                                    <td rowSpan='2'>
                                        <Card 
                                            className={this.props.clickable ? 'cursor-on-hover': ''}
                                            onClick={() => {
                                                this.props.clickable && this.props.history.push(`/r/${this.props.subreddit}/post/${this.props.postid}/`)
                                            }}
                                        >
                                            <CardHeader>
                                                <Row>
                                                    <Col sm={7}>
                                                        {this.props.userlink && 
                                                            <a
                                                                className='black-text black-text-on-hover cursor-on-hover'
                                                                href='/'
                                                                onClick={(event) => {
                                                                    event.stopPropagation()
                                                                    event.preventDefault()
                                                                    this.props.history.push(`/u/${this.props.username}/`)
                                                                }}
                                                            >
                                                                {this.props.username}
                                                            </a>
                                                        }
                                                        {this.props.subredditlink &&
                                                            <a
                                                                className='cursor-on-hover'
                                                                href='/'
                                                                onClick={(event) => {
                                                                    event.stopPropagation()
                                                                    event.preventDefault()
                                                                    this.props.history.push(`/r/${this.props.subreddit}/`)
                                                                }}
                                                            >
                                                                r/{this.props.subreddit}
                                                            </a>
                                                        }
                                                        <small className='text-muted'>  {this.state.votes} vote(s)</small>
                                                    </Col>
                                                    <Col sm={5}>
                                                        {this.props.can_edit && 
                                                            <EditComment
                                                                updateURL = {`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/${this.props.commentid}/`}
                                                                successURL = {`/r/${this.props.subreddit}/post/${this.props.postid}/`}
                                                                content = {this.props.content}
                                                                votes = {this.props.votes}
                                                            />
                                                        }
                                                        {this.props.can_delete && 
                                                            <DeleteTemplate
                                                                toDeleteURL = {`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/${this.props.commentid}/`}
                                                                successURL = {`/r/${this.props.subreddit}/post/${this.props.postid}/`}
                                                            />
                                                        }
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <CardText>{this.props.content}</CardText>
                                            </CardBody>
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

export default withRouter(CommentTemplate)