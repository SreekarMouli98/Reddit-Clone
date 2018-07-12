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

class CardComponent extends Component { 
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
                                    <td className='fixed-width'>
                                        <InputGroup>
                                            <Button color={this.state.upvoted ? 'success' : 'light'} onClick={() => this.toggleUpvote()}>
                                                <i className="fa fa-arrow-up" aria-hidden="true"></i>
                                            </Button>
                                            <Button 
                                                color={this.state.downvoted ? 'success' : 'light'}
                                                onClick={() => this.toggleDownvote()}
                                            ><i className="fa fa-arrow-down" aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                    </td>
                                    <td rowSpan='3'>
                                        <Card>
                                            <CardBody>
                                                <CardTitle>
                                                    <CardLink 
                                                        href={'/' + this.props.subredditlink + '/post/' +  this.props.postid + '/'}
                                                    >
                                                        {this.props.title}
                                                        <small className='text-muted'>  {this.state.votes} votes</small>
                                                    </CardLink>
                                                </CardTitle>
                                                <CardText>{this.props.content}</CardText>
                                                <CardLink href={'/' + this.props.subredditlink + '/'}>{this.props.subredditlink}</CardLink>
                                                <CardLink href={'/' + this.props.userlink + '/'}>{this.props.userlink}</CardLink> 
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

export default CardComponent;   