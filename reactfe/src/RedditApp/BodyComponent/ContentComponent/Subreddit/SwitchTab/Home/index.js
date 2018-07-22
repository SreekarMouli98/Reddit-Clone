import React, {Component} from 'react'
import Context from '../../../../../../provider'
import {
    Container,
    Alert,
    Row,
    Col
} from 'reactstrap'
import PostTemplate from '../../../assets/PostTemplate'

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
                                <React.Fragment>
                                    <h1 className='display-1 text-center'>Welcome to Reddit</h1>
                                    <Alert color='danger'>Please login to utilize reddit completely</Alert>
                                </React.Fragment>
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
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                        :
                                        <h3 className='text-center'>
                                            Seems like you haven't subscribed to anything!
                                        </h3>
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