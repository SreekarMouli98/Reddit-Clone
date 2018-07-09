import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardLink,
    CardFooter,
    Jumbotron,
} from 'reactstrap'

class PostHeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            profile:'',
            owner: {username: ''},
            subreddit:'',
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`)
        .then(data => data.json())
        .then(data => {
            this.setState({
            post: data,
            profile: data.owner,
            owner: data.owner.owner,
            subreddit: data.subreddit,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <CardLink href={'/r/' + this.state.subreddit.name + '/'}>r/{this.state.subreddit.name}</CardLink>
                        <CardText className='text-muted'>
                            Posted by <CardLink href={'/u/' + this.state.owner.username + '/'}>u/{this.state.owner.username}</CardLink>
                        </CardText>
                    </CardHeader>
                    <CardBody>
                        <CardText className='display-3'>{this.state.post.title}</CardText>
                        <CardText>{this.state.post.content}</CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

class CommentComponent extends Component {
    render() {
        return (
            <Card>
                <CardHeader><CardLink href={'/u/' + this.props.owner.username + '/'}>{this.props.owner.username}</CardLink> . {this.props.comment.votes} votes</CardHeader>
                <CardBody>
                    <CardText>{this.props.comment.content}</CardText>
                </CardBody>
            </Card>
        )
    }
}

export default class PostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {comments: []}
    }

    componentDidMount() {
        console.log('PostComponent mounted')
        fetch(`http://localhost:8000/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/`)
        .then(data => data.json())
        .then(data => {
                console.log(data)
                this.setState({comments: data})
            }
        )
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <PostHeaderComponent
                                subreddit={this.props.subreddit}
                                postid={this.props.postid}
                            />
                            <Jumbotron>
                                {this.state.comments.map((comment) => {
                                    return (
                                        <Row key={comment.id}>
                                            <Col>            
                                                <CommentComponent
                                                    comment={comment}
                                                    owner={comment.owner.owner}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Jumbotron>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}