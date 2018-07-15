import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import PostTemplate from '../../assets/PostTemplate'

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {   
        fetch('/api/reddit/r/popular/')
        .then(result => {
            return result.json();
        })
        .then(data => {
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
                            <PostTemplate
                                    can_vote={true}
                                    postid={post.id}
                                    votes={post.votes}
                                    title={post.title} 
                                    content={post.content} 
                                    subreddit= {post.subreddit.name} 
                                    username= {post.profile.username} 
                                    subredditlink={true}
                                    userlink={true}
                                />
                            </Col>
                        </Row>
                    )
                })}
            </React.Fragment>   
        )
    }
}