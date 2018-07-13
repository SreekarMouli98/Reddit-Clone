import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import PostComponent from '../../OtherComponents/PostComponent'

export default class SubredditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {   
        console.log('subreddit mounted: ', this.props.subreddit)
        fetch(`/api/reddit/r/${this.props.subreddit}/posts/`)
        .then(result => {   
            return result.json();
        })
        .then(data => {
            console.log(data)
            this.setState({posts: data})
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
                                    can_vote={true}
                                    postid={post.id}
                                    votes={post.votes}
                                    title={post.title} 
                                    content={post.content} 
                                    // subreddit= {post.subreddit.name} 
                                    username= {post.profile.username}
                                />
                            </Col>
                        </Row>
                    )
                })}
            </React.Fragment>   
        )
    }
}