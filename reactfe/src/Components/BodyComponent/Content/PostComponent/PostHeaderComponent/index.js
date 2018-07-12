import React, {Component} from 'react'
import {
    Card,
    CardHeader,
    CardText,
    CardLink,
    CardBody,
} from 'reactstrap'

export default class PostHeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            profile:'',
            owner: {username: ''},
            subreddit:'',
        }
    }

    componentDidMount() {
        fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`)
        .then(data => data.json())
        .then(data => {
            this.setState({
                post: data,
                profile: data.owner,
                owner: data.owner.owner,
                subreddit: data.subreddit,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <CardLink href={'/r/' + this.state.subreddit.name + '/'}>r/{this.state.subreddit.name}</CardLink>
                        <CardText className='text-muted'>
                            Posted by <CardLink href={'/u/' + this.state.owner.username + '/'}>u/{this.state.owner.username}</CardLink>
                        </CardText>
                    </CardHeader>
                    <CardBody>
                        <CardText className='display-3'>{this.state.post.title}</CardText>
                        <CardText>{this.state.post.content}</CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}
