import React, {Component} from 'react';
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Table,
    Button,
    InputGroup,
} from 'reactstrap'
import Context from '../../../../../provider'
import './style.css'

class PostTemplate extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            upvoted: false,
            downvoted: false,
            votes: this.props.votes,
        }
    }

    componentDidMount() {
    }

    toggleUpvote() {
        this.setState(prev => ({
                upvoted: !prev.upvoted,
                downvoted: false,
                votes : (!prev.upvoted) ? prev.votes + (prev.downvoted ? 2 : 1) : prev.votes - (prev.downvoted ? 2 : 1),
            })
        )
    }

    toggleDownvote() {
        this.setState(prev => ({
                downvoted: !prev.downvoted,
                upvoted: false,
                votes : (!prev.downvoted) ? prev.votes - (prev.upvoted ? 2 : 1) : prev.votes + (prev.upvoted ? 2 : 1),
            })
        )
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
                                            <InputGroup>
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
                                            </InputGroup>
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