import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardLink,
    CardFooter,
    Jumbotron,
} from 'reactstrap'
import PostHeaderComponent from './PostHeaderComponent'
import CommentComponent from './CommentComponent'

export default class PostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {comments: []}
    }

    componentDidMount() {
        console.log('PostComponent mounted')
        fetch(`http://localhost:8000/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/`)
        .then(data => data.json())
        .then(data => {
                console.log(data)
                this.setState({comments: data})
            }
        )
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <PostHeaderComponent
                                subreddit={this.props.subreddit}
                                postid={this.props.postid}
                            />
                            <Jumbotron>
                                {this.state.comments.map((comment) => {
                                    return (
                                        <Row key={comment.id}>
                                            <Col>            
                                                <CommentComponent
                                                    comment={comment}
                                                    owner={comment.owner.owner}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Jumbotron>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}