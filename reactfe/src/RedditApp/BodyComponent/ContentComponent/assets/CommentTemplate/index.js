import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardLink,
    Table,
    Button,
    InputGroup,
} from 'reactstrap'
import Context from '../../../../../provider'

export default class CommentTemplate extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            upvoted: false,
            downvoted: false,
            votes: this.props.votes,
        }
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
                                    <td rowSpan='2'>
                                        <Card>
                                            <CardHeader>
                                                {this.props.userlink && 
                                                    <CardLink 
                                                        href={'/u/' + this.props.username + '/'}
                                                    >{this.props.username}</CardLink>
                                                }
                                                {this.props.subredditlink &&
                                                    <CardLink 
                                                        href={'/r/' + this.props.subreddit + '/post/' + this.props.postid + '/'}
                                                    >r/{this.props.subreddit}</CardLink>
                                                }
                                                <small className='text-muted'>  {this.state.votes} vote(s)</small>
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