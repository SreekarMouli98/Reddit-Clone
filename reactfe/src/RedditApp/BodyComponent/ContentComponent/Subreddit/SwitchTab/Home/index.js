import React, {Component} from 'react'
import Context from '../../../../../../provider'
import {
    Container,
    Alert,
    Row,
    Col
} from 'reactstrap'
import PostTemplate from '../../../assets/PostTemplate'
import AlertTemplate from '../../../assets/AlertTemplate'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    
    fetchPosts(context) {
        context.loggedIn === true && 
            fetch(`/api/reddit/r/home/${context.username}/`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    posts: json
                })
            })
    }

    componentDidMount() {
        this.fetchPosts(this.props.context)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchPosts(nextProps.context)
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            {context.loggedIn === false ? 
                                <AlertTemplate color='danger'>
                                    <h1 className='display-4 text-center'>Welcome to Reddit</h1>
                                    <hr />
                                    <p className='text-center'>Please login to utilize reddit completely</p>
                                </AlertTemplate>
                                :
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
                                        })
                                        :
                                        <AlertTemplate color='info'>
                                            <hr />
                                            <h2 className='text-center display-5'>
                                                Subscribe to your favourite subreddits to get feed from them directly.
                                            </h2>
                                            <hr />
                                        </AlertTemplate>
                                    }
                                </React.Fragment>                            
                            }
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}