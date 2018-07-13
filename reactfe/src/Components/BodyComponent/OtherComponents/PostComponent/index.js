import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardLink,
    Table,
    Button,
    InputGroup,
} from 'reactstrap'
import Context from '../../../provider'
import './style.css'

export default class PostComponent extends Component { 
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
                                        <Card>
                                            <CardBody>
                                                <CardTitle>
                                                    <CardLink 
                                                        href={'/r/' + this.props.subreddit + '/post/' +  this.props.postid + '/'}
                                                    >
                                                        {this.props.title}
                                                    </CardLink>
                                                    <small className='text-muted'>  {this.state.votes} votes</small>
                                                </CardTitle>
                                                <CardText>{this.props.content}</CardText>
                                                {this.props.subreddit && 
                                                    <CardLink href={'/r/' + this.props.subreddit + '/'}>
                                                        {'r/' + this.props.subreddit}
                                                    </CardLink>
                                                }
                                                { this.props.username &&
                                                    <CardText>
                                                        Posted by 
                                                        <CardLink href={'/u/' + this.props.username + '/'}>
                                                            {' ' + this.props.username}
                                                        </CardLink>
                                                    </CardText> 
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