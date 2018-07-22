import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import PostTemplate from '../assets/PostTemplate'
import Context from '../../../../provider'

export default class Subreddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {   
        fetch(`/api/reddit/r/${this.props.subreddit}/posts/`)
        .then(result => {   
            return result.json();
        })
        .then(data => {
            this.setState({posts: data})
        })
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
                                                subreddit={post.subreddit.name}
                                                username={post.profile.username}
                                                userlink={true}
                                                clickable={true}
                                                can_edit={context.username === post.profile.username && context.loggedIn === true}
                                                can_delete={context.username === post.profile.username && context.loggedIn === true}    
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