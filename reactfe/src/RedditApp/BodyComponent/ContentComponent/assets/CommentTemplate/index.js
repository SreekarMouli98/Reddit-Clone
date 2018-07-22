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
            const url = `/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/${this.props.commentid}/`
            fetch(url, {
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
                                                    onClick={() => this.toggleUpvote()}
                                                >
                                                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                                                </Button>
                                                <Button 
                                                    color={this.state.downvoted ? 'success' : 'light'}
                                                    onClick={() => this.toggleDownvote()}
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