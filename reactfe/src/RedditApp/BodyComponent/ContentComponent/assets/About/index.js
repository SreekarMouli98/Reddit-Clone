import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Jumbotron,
    CardGroup,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
} from 'reactstrap'
import Context from '../../../../../provider'

class About extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Jumbotron className='text-center'>
                                <h1 className='display-5'>THE CONVERSATION STARTS HERE</h1>
                                <hr />
                                <p className='lead'>
                                    Reddit is home to thousands of communities, endless conversation, and authentic human connection. Whether you're into breaking news, sports, TV fan theories, or a never-ending stream of the internet's cutest animals, there's a community on Reddit for you.
                                </p>
                            </Jumbotron>
                            <Jumbotron className='text-center'>
                                <h1 className='display-5'>How Does Reddit Work?</h1>
                                <hr />
                                <p className='lead'>
                                Every day, millions of people around the world post, vote, and comment in communities organized around their interests.
                                </p>
                                <CardGroup>
                                    <Card body outline color='success'>
                                        <CardBody>
                                            <CardTitle>SUBREDDIT</CardTitle>
                                            <CardText>A Subreddit is basically a community where things related to that specific topic are discussed.</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card body outline color='success'>
                                        <CardBody>
                                            <CardTitle>POST</CardTitle>
                                            <CardText>The community can share content by posting their thoughts and stories in a subreddit.</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card body outline color='success'>
                                        <CardBody>
                                            <CardTitle>COMMENT</CardTitle>
                                            <CardText>The community comments on posts. Comments provide discussion and often humor.</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card body outline color='success'>
                                        <CardBody>
                                            <CardTitle>VOTE</CardTitle>
                                            <CardText>Comments & posts can be upvoted or downvoted. The most interesting content rises to the top.</CardText>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Jumbotron>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(About)