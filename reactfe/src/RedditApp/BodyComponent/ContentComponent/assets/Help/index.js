import React, {Component} from 'react'
import Context from '../../../../../provider'
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'
import {
    withRouter,
} from 'react-router'

class Help extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Card outline color='primary'>
                                <CardBody>
                                    <CardTitle>How do I create my account?</CardTitle>
                                    <hr />
                                    <CardText>
                                        {'Click the "SIGNUP" button on the top-right or click '}
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                context.loggedIn === false && context.toggleSignupModal()
                                            }}
                                            >
                                            here
                                        </a>
                                        {' to create your account.'}
                                    </CardText>
                                </CardBody>
                            </Card>
                            <Card outline color='success'>
                                <CardBody>
                                    <CardTitle>What is a subreddit?</CardTitle>
                                    <hr />
                                    <CardText>A subreddit is basically a community where the community is organized around a topic of their interest.</CardText>
                                </CardBody>
                            </Card>
                            <Card outline color='info'>
                                <CardBody>
                                    <CardTitle>How do I create a subreddit?</CardTitle>
                                    <hr />
                                    <CardText>
                                        {'After logging in to Reddit, you can click '}
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                context.loggedIn ? 
                                                    this.props.history.push('/create/')
                                                    : 
                                                    context.toggleLoginModal()
                                            }}
                                            >
                                            here
                                        </a>
                                        {' to create your own subreddit.'}
                                    </CardText>
                                </CardBody>
                            </Card>
                            <Card outline color='danger'>
                                <CardBody>
                                    <CardTitle>What is a post?</CardTitle>
                                    <hr />
                                    <CardText>
                                        In a subreddit, your can state your point or opinion by making a post.
                                    </CardText>
                                </CardBody>
                            </Card>
                            <Card outline color='secondary'>
                                <CardBody>
                                    <CardTitle>How do I create a post?</CardTitle>
                                    <hr />
                                    <CardText>
                                        {'After logging in to Reddit, you can click '}
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                context.loggedIn ? 
                                                    this.props.history.push('/new/')
                                                    : 
                                                    context.toggleLoginModal()
                                            }}
                                            >
                                            here
                                        </a>
                                        {' to create a post.'}
                                    </CardText>
                                </CardBody>
                            </Card>
                            <Card outline color='danger'>
                                <CardBody>
                                    <CardTitle>What is Home, Popular and All?</CardTitle>
                                    <hr />
                                    <CardText>
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                this.props.history.push('/r/home/')
                                            }}
                                            >
                                            Home
                                        </a>
                                        {' page is used to show you only the posts from the subreddits that you are subscribed to.'}
                                    </CardText>
                                    <CardText>
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                this.props.history.push('/r/popular/')
                                            }}
                                            >
                                            Popular
                                        </a>
                                        {' page is used to show you only those posts which are trending and are having high votes.'}
                                    </CardText>
                                    <CardText>
                                        <a 
                                            href='#' 
                                            className='black-text black-text-on-hover' 
                                            onClick={(event) => {
                                                event.preventDefault()
                                                this.props.history.push('/r/all/')
                                            }}
                                            >
                                            All
                                        </a>
                                        {' page is used to show all the recent and newer posts rising in Reddit.'}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )}
                }
            </Context.Consumer>
        )
    }
}

export default withRouter(Help)