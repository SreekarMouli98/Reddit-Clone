import React, {Component} from 'react'
import Context from '../../provider'
import { 
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from "react-router-dom"
import {
    Container,
    Row,
    Col,
} from 'reactstrap'
// import ProfileComponent from './Content/ProfileComponent'
// import SubredditComponent from './Content/SubredditComponent'
// import PostOverviewComponent from './Content/PostOverviewComponent'
// import InfoComponent from './Content/InfoComponent'
// import NewPostComponent from './OtherComponents/NewPostComponent'
import InfoComponent  from './InfoComponent'
import SwitchTab from './ContentComponent/Subreddit/SwitchTab'
import './style.css'

class Handler extends React.Component {
    componentDidMount() {
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
                            <Row className='responsive-reorder'>
                                <Col md='8' id='body-block'>
                                    <SwitchTab />
                                    {/* <BrowserRouter>
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
                                                render={() => {
                                                    return (
                                                        <React.Fragment>
                                                            <Handler setActiveTab={context.toggleTab} activeTab={'1'} />
                                                        </React.Fragment>
                                                    )}
                                                }
                                            />
                                            <Route 
                                                exact 
                                                path='/r/popular/' 
                                                render={() => {
                                                    return (
                                                        <React.Fragment>
                                                            <Handler setActiveTab={context.toggleTab} activeTab={'2'} />
                                                        </React.Fragment>
                                                    )}
                                                }
                                            />
                                            <Route 
                                                exact 
                                                path='/r/all/' 
                                                render={() => {
                                                    return (
                                                        <React.Fragment>
                                                            <Handler setActiveTab={context.toggleTab} activeTab={'3'} />
                                                        </React.Fragment>
                                                    )}
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
                                                            <PostOverviewComponent
                                                                subreddit={props.match.params.subreddit}
                                                                postid={props.match.params.postid}
                                                            />
                                                        </React.Fragment>
                                                    )
                                                }}
                                            />
                                            <Route
                                                exact
                                                path = '/new/'
                                                render={(props) => {
                                                    return (
                                                        <React.Fragment>
                                                            <NewPostComponent 
                                                                
                                                            />
                                                        </React.Fragment>
                                                    )
                                                }}
                                            />
                                        </Switch>
                                    </BrowserRouter> */}
                                </Col>
                                <Col md='4' id='info-block'><InfoComponent /></Col>
                            </Row>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}