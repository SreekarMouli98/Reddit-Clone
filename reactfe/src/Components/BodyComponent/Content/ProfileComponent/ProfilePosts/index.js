import React, {Component} from 'react'
import {
    Row,
    Col
} from 'reactstrap'
import PostComponent from '../../../OtherComponents/PostComponent'

export default class ProfilePosts extends Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }

    componentDidMount() {
        fetch(`/api/reddit/u/${this.props.username}/posts/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                posts: json,
            })
            console.log(this.state)
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map((post) => {
                        return (
                            <Row key={post.id}>
                                <Col sm={12}>
                                    <PostComponent
                                        postid = {post.id}
                                        votes={post.votes}
                                        title={post.title} 
                                        content={post.content} 
                                        subreddit= {post.subreddit.name} 
                                    />
                                </Col>
                            </Row>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}