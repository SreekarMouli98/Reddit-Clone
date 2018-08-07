import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import PostTemplate from '../assets/PostTemplate'
import AlertTemplate from '../assets/AlertTemplate'
import Context from '../../../../provider'

export default class Subreddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    fetchSubredditData(subreddit) {
        fetch(`/api/reddit/r/${subreddit}/posts/`)
        .then(result => {   
            return result.json();
        })
        .then(data => {
            this.setState({posts: data})
        })
    }

    componentDidMount() {   
        this.fetchSubredditData(this.props.subreddit)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchSubredditData(nextProps.subreddit)
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
                                })
                                :
                                <AlertTemplate color='info'>
                                    <h1 className='text-center display-5'>
                                        Seems like no one posted yet.
                                    </h1>
                                    <hr />
                                    <p className='text-center display-6'>
                                        Be the first to make a post here.
                                    </p>
                                </AlertTemplate>
                            }
                        </React.Fragment>   
                    )
                }}
            </Context.Consumer>
        )
    }
}