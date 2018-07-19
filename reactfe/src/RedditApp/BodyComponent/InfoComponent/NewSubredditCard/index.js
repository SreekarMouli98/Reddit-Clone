import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    Button,
    CardText,
} from 'reactstrap'

class NewSubredditCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardText>Wanna have your own community? Create your own subreddit here!</CardText>
                    <Button color='primary' block onClick={()=>this.props.history.push('/create/')}>CREATE SUBREDDIT</Button>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(NewSubredditCard)