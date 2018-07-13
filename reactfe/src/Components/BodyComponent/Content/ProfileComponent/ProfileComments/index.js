import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardLink,
    Row,
    Col,
} from 'reactstrap'
import CommentComponent from '../../../OtherComponents/CommentComponent'

export default class ProfileComments extends Component {
    constructor(props) {
        super(props)
        this.state = {comments: []}
    }

    componentDidMount() {
        fetch(`/api/reddit/u/${this.props.username}/comments/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                comments: json,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
            {this.state.comments.map((comment) => {
                    return (
                        <Row key={comment.id}>
                            <Col>
                                <CommentComponent
                                    content={comment.content}                            
                                    votes={comment.votes}
                                    postid={comment.parent_post.id}
                                    subreddit={comment.parent_post.subreddit.name}
                                />
                            </Col>
                        </Row>
                    )
                }
            )}
            </React.Fragment>
        )
    }
}