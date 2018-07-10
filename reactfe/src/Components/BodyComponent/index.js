import React, {Component} from 'react'
import Context from '../provider'
import SwitchTab from './OtherComponents/SwitchTab'
import { 
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from "react-router-dom"
import {
    Container,
} from 'reactstrap'
import ProfileComponent from './Content/ProfileComponent'
import SubredditComponent from './Content/SubredditComponent'
import PostComponent from './Content/PostComponent'

class Handler extends React.Component {
    componentDidMount() {
        console.log('Handler mounted')
        this.props.setActiveTab(this.props.activeTab);
    }
  
    render() {
      return null;
    }
 }

export default class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <SwitchTab />
                            <BrowserRouter>
                                <Switch>
                                    <Route 
                                        exact 
                                        path='/' 
                                        render={() =>
                                            <Redirect to='r/home/' />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/home/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'1'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/popular/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'2'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/all/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'3'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/u/:username/' 
                                        render={(props) => {
                                            return (
                                                <React.Fragment>
                                                    <Handler setActiveTab={context.toggleTab} activeTab={'4'} />
                                                    <ProfileComponent username={props.match.params.username} />
                                                </React.Fragment>
                                            )
                                        }}
                                    />
                                    <Route
                                        exact
                                        path='/r/:subreddit/'
                                        render={(props) => {
                                            return (
                                                <React.Fragment>
                                                    <Handler setActiveTab={context.toggleTab} activeTab={'4'} />
                                                    <SubredditComponent subreddit={props.match.params.subreddit} />
                                                </React.Fragment>
                                            )
                                        }}
                                    />
                                    <Route
                                        exact
                                        path = '/r/:subreddit/post/:postid/'
                                        render={(props) => {
                                            return (
                                                <React.Fragment>
                                                    <Handler setActiveTab={context.toggleTab} activeTab={'4'} />
                                                    <PostComponent
                                                        subreddit={props.match.params.subreddit}
                                                        postid={props.match.params.postid}
                                                    />
                                                </React.Fragment>
                                            )
                                        }}
                                    />
                                </Switch>
                            </BrowserRouter>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}