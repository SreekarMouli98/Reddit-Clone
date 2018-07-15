import React, {Component} from 'react'
import {
    Jumbotron,
} from 'reactstrap'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'
import InfoCardComponent from './InfoCardComponent'

class SubredditHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }

    componentDidMount() {
        fetch(`/api/reddit/r/${this.props.subreddit}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({data: json})
        })
    }

    render() {
        var {data} = this.state
        return (
            <React.Fragment>
                <InfoCardComponent 
                    reddit={true}
                    redditlink={true}
                    title={data.name}
                    content={data.description}
                    subscribe={true}
                />
            </React.Fragment>
        )
    }
}

class UserHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {data:''}       
    }

    componentDidMount() {
        fetch(`/api/reddit/u/${this.props.user}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({data: json})
            console.log('UserHelper: ', json)
        })
    }
    
    render() {
        var {data} = this.state
        return (
            <InfoCardComponent
                user={true}
                title={data.username}
                karma={data.karma}
                dob={data.dob}
            />
        )
    }
}

export default class InfoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {temp:false}
    }

    componentWillReceiveProps() {
        this.forceUpdate()
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => {
                            return (
                                <React.Fragment>
                                    <InfoCardComponent
                                        reddit={true}
                                        title='Home'
                                        content = 'Your personal Reddit frontpage. Come here to check in with your favorite communities.'
                                    />
                                </React.Fragment>
                            )}
                        }
                    />   
                    <Route exact path='/r/home/' render={() => {
                            return (
                                <React.Fragment>
                                    <InfoCardComponent
                                        reddit={true}
                                        title='Home'
                                        content = 'Your personal Reddit frontpage. Come here to check in with your favorite communities.'
                                    />
                                </React.Fragment>
                            )}
                        }
                    />   
                    <Route exact path='/r/popular/' render={() => {
                            return (
                                <React.Fragment>
                                    <InfoCardComponent
                                        reddit={true}
                                        title='Popular'
                                        content='The best posts on Reddit for you, pulled from the most active communities on Reddit. Check here to see the most shared, upvoted, and commented content on the internet.'
                                    />
                                </React.Fragment>
                            )}
                        }
                    />
                    <Route exact path='/r/all/' render={() => {
                            return (
                                <React.Fragment>
                                    <InfoCardComponent
                                        reddit={true}
                                        title='All'
                                        content = 'The most active posts from all of Reddit. Come here to see new posts rising and be a part of the conversation.'
                                    />
                                </React.Fragment>
                            )}
                        }
                    />
                    <Route path='/r/:subreddit' render={(props) => {
                            return (
                                <React.Fragment>
                                    <SubredditHelper subreddit={props.match.params.subreddit} />
                                </React.Fragment>
                            )}
                        }
                    />
                    <Route path='/u/:user' render={(props) => {
                            return (
                                <React.Fragment>
                                    <UserHelper user={props.match.params.user} />
                                </React.Fragment>
                            )}
                        }
                    />   
                    <Route path='/new/' render={(props) => {
                            return (
                                <React.Fragment>
                                    <InfoCardComponent 
                                        new={true}
                                    />
                                </React.Fragment>
                            )}
                        }
                    />                      
                </Switch>
            </BrowserRouter>
        )
    }
}
