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
import Context from '../../../../provider'

class NewSubredditCard extends Component {
    handleClick(context) {
        context.loggedIn ? 
            this.props.history.push('/create/')
            :
            context.toggleLoginModal()
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Card>
                            <CardBody>
                                <CardText>Wanna have your own community? Create your own subreddit here!</CardText>
                                <Button color='primary' block onClick={()=>this.handleClick(context)}>CREATE SUBREDDIT</Button>
                            </CardBody>
                        </Card>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(NewSubredditCard)