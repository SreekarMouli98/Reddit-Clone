import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'reactstrap'
import '../../assets/CommentTemplate'
import CommentTemplate from '../../assets/CommentTemplate';

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
                                <CommentTemplate
                                    content={comment.content}                            
                                    votes={comment.votes}
                                    postid={comment.parent_post.id}
                                    subreddit={comment.parent_post.subreddit.name}
                                    subredditlink={true}
                                    clickable={true}
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