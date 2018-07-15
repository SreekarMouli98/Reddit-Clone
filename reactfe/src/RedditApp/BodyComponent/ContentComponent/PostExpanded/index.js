import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Row,
    Col,
    Jumbotron,
} from 'reactstrap'
import PostTemplate from '../assets/PostTemplate'
import CommentTemplate from '../assets/CommentTemplate'



export default class PostExpanded extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post:{
                subreddit:'',
                profile:'',
            },
            comments: [],
        }
    }

    componentDidMount() {
        fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                post: json,
            })
        })
        .then(
            fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    comments: json,
                })
            })
        )
    }

    render() {
        var {post, comments} = this.state
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <PostTemplate 
                                can_vote={true}
                                postid={post.id}
                                title={post.title}
                                content={post.content}  
                                votes={post.votes}
                                subreddit={post.subreddit.name}
                                username={post.profile.username}
                                userlink={true}
                            />
                            {comments.length !== 0 &&
                                <Jumbotron>
                                    {comments.map((comment) => {
                                        return (
                                            <Row key={comment.id}>
                                                <Col>
                                                    <CommentTemplate
                                                        can_vote={true}
                                                        username={comment.profile.username}
                                                        content={comment.content}
                                                        votes={comment.votes}
                                                        userlink={true}
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                    )}
                                </Jumbotron>
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}