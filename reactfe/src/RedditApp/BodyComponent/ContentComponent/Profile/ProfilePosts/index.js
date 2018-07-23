import React, {Component} from 'react'
import {
    Row,
    Col
} from 'reactstrap'
import PostTemplate from '../../assets/PostTemplate'
import Context from '../../../../../provider'

export default class ProfilePosts extends Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }

    fetchPosts(username) {
        fetch(`/api/reddit/u/${username}/posts/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                posts: json,
            })
        })
    }

    componentDidMount() {
        this.fetchPosts(this.props.username)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchPosts(nextProps.username)
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            {this.state.posts.length !== 0 ? 
                                this.state.posts.map((post) => {
                                    return (
                                        <Row key={post.id}>
                                            <Col sm={12}>
                                                <PostTemplate
                                                    context={context}
                                                    postid={post.id}
                                                    upvotes={post.upvotes}
                                                    downvotes={post.downvotes}
                                                    title={post.title} 
                                                    content={post.content} 
                                                    subreddit= {post.subreddit.name} 
                                                    subredditlink={true}
                                                    clickable={true}
                                                    can_edit={context.username === post.profile.username && context.loggedIn === true}
                                                    can_delete={context.username === post.profile.username && context.loggedIn === true}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                })
                                :
                                <h3 className='text-center'>
                                    User hasn't made any posts yet!
                                </h3>
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}