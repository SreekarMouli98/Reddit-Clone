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

export default class InfoComponent extends Component {
    render() {
        return (
            <Jumbotron>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/r/all/' render={() => {
                                return (
                                    <React.Fragment>
                                        <InfoCardComponent
                                            title='All'
                                            content = 'The most active posts from all of Reddit. Come here to see new posts rising and be a part of the conversation.'
                                            button= 'Do something'
                                        />
                                    </React.Fragment>
                                )}
                            }
                        />
                        <Route exact path='/r/popular/' render={() => {
                                return (
                                    <React.Fragment>
                                        <InfoCardComponent
                                            title='Popular'
                                            content='The best posts on Reddit for you, pulled from the most active communities on Reddit. Check here to see the most shared, upvoted, and commented content on the internet.'
                                            button= 'Do something'
                                        />
                                    </React.Fragment>
                                )}
                            }
                        />
                        <Route exact path='/r/home/' render={() => {
                                return (
                                    <React.Fragment>
                                        <InfoCardComponent
                                            title='Home'
                                            content = 'Your personal Reddit frontpage. Come here to check in with your favorite communities.'
                                            button= 'Do something'
                                        />
                                    </React.Fragment>
                                )}
                            }
                        />   
                        {/* <Route exact path='/r/:subreddit/' render={() => {
                                return (
                                    <React.Fragment>
                                        <InfoCardComponent 

                                        />
                                    </React.Fragment>
                                )}
                            }
                        />                         */}
                    </Switch>
                </BrowserRouter>
            </Jumbotron>
        )
    }
}
