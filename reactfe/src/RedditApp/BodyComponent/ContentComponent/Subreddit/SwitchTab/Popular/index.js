import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import PostTemplate from '../../../assets/PostTemplate'
import Context from '../../../../../../provider'

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    fetchPosts() {
        fetch('/api/reddit/r/popular/')
        .then(data => data.json())
        .then(json => {
            this.setState({posts: json})
        })
    }

    componentDidMount() {   
        this.fetchPosts()
    }

    componentWillReceiveProps(nextProps) {
        this.fetchPosts()
    }
    
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            {this.state.posts.map((post) => {
                                return (
                                    <Row key={post.id}>
                                        <Col sm={12}>
                                        <PostTemplate
                                            context={context}
                                            can_vote={true}
                                            postid={post.id}
                                            upvotes={post.upvotes}
                                            downvotes={post.downvotes}
                                            title={post.title} 
                                            content={post.content} 
                                            subreddit= {post.subreddit.name} 
                                            username= {post.profile.username} 
                                            subredditlink={true}
                                            userlink={true}
                                            clickable={true}
                                            can_edit={context.username === post.profile.username && context.loggedIn === true}
                                            can_delete={context.username === post.profile.username && context.loggedIn === true}
                                            created_at={post.created_at}
                                            updated_at={post.updated_at}
                                        />
                                        </Col>
                                    </Row>
                                )
                            })}
                        </React.Fragment>   
                    )
                }}
            </Context.Consumer>
        )
    }
}