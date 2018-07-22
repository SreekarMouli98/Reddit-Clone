import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Row,
    Col,
    Table,
    Jumbotron,
} from 'reactstrap'
import PostTemplate from '../assets/PostTemplate'
import CommentTemplate from '../assets/CommentTemplate'
import NewComment from '../assets/NewComment'

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

    fetchPostsAndComments(subreddit, postid) {
        fetch(`/api/reddit/r/${subreddit}/posts/${postid}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                post: json,
            })
        })
        .then(
            fetch(`/api/reddit/r/${subreddit}/posts/${postid}/comments/`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    comments: json,
                })
            })
        )
    }

    componentDidMount() {
        this.fetchPostsAndComments(this.props.subreddit, this.props.postid)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchPostsAndComments(nextProps.subreddit, nextProps.postid)
    }

    render() {
        var {post, comments} = this.state
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <PostTemplate 
                                context={context}
                                can_vote={true}
                                postid={post.id}
                                title={post.title}
                                content={post.content}  
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                subreddit={post.subreddit.name}
                                username={post.profile.username}
                                userlink={true}
                                can_edit={context.username === post.profile.username && context.loggedIn === true}
                                can_delete={context.username === post.profile.username && context.loggedIn === true}    
                            />
                            <Table>
                                <thead>
                                    <tr>
                                        <NewComment 
                                            subreddit={this.props.subreddit}
                                            postid={this.props.postid}
                                        />
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.length !== 0 &&
                                        <React.Fragment>
                                            {comments.map((comment) => {
                                                return (
                                                    <tr key={comment.id}>
                                                        <CommentTemplate
                                                            context={context}
                                                            can_vote={true}
                                                            username={comment.profile.username}
                                                            content={comment.content}
                                                            upvotes={comment.upvotes}
                                                            downvotes={comment.downvotes}
                                                            userlink={true}
                                                            subreddit={comment.parent_post.subreddit.name}
                                                            postid={comment.parent_post.id}
                                                            commentid={comment.id}
                                                            can_edit={context.username === comment.profile.username && context.loggedIn === true}
                                                            can_delete={context.username === comment.profile.username && context.loggedIn === true}
                                                        />
                                                    </tr>
                                                )}
                                            )}
                                        </React.Fragment>
                                    }
                                </tbody>
                            </Table>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}