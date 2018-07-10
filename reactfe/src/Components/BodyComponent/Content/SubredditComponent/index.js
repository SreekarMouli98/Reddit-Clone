import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import CardComponent from '../../OtherComponents/CardComponent'

export default class SubredditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {   
        console.log('subreddit mounted: ', this.props.subreddit)
        fetch(`http://localhost:8000/api/reddit/r/${this.props.subreddit}/posts/`)
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
                                <CardComponent
                                    postid={post.id}
                                    votes={post.votes}
                                    title={post.title} 
                                    content={post.content} 
                                    subredditlink= {'r/' + post.subreddit.name.toLowerCase()} 
                                    userlink= {'u/' + post.owner.owner.username.toLowerCase()}
                                />
                            </Col>
                        </Row>
                    )
                })}
            </React.Fragment>   
        )
    }
}