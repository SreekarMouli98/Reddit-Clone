import React, {Component} from 'react'
import Context from '../../provider'
import { 
    Route,
    Switch,
} from "react-router-dom"
import {
    withRouter
} from 'react-router'
import {
    Container,
} from 'reactstrap'
import Profile from './ContentComponent/Profile'
import Subreddit from './ContentComponent/Subreddit'
import PostExpanded from './ContentComponent/PostExpanded'
import EditCreatePost from './ContentComponent/assets/EditCreatePost'
import EditProfile from './ContentComponent/assets/EditProfile'
import About from './ContentComponent/assets/About'
import Help from './ContentComponent/assets/Help'
import EditCreateSubreddit from './ContentComponent/assets/EditCreateSubreddit'
import SearchPage from './ContentComponent/SearchPage'
import './style.css'
import Wrapper from './Wrapper'

class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <Switch>
                                <Route 
                                    exact 
                                    path='/' 
                                    render={() => 
                                        <React.Fragment>
                                           {this.props.history.push('/r/home/')}
                                        </React.Fragment>
                                    }
                                />
                                <Route 
                                    exact 
                                    path='/r/home/' 
                                    render={() => 
                                        <Wrapper 
                                            setActiveTab={context.toggleTab}
                                            activeTab={'1'} 
                                            info='home'
                                        />
                                    }
                                />
                                <Route 
                                    exact 
                                    path='/r/popular/' 
                                    render={() => 
                                        <Wrapper 
                                            setActiveTab={context.toggleTab} 
                                            activeTab={'2'} 
                                            info='popular'
                                        />
                                    }
                                />
                                <Route 
                                    exact 
                                    path='/r/all/' 
                                    render={() =>
                                        <Wrapper 
                                            setActiveTab={context.toggleTab} 
                                            activeTab={'3'} 
                                            info='all'
                                        />
                                    }
                                />
                                <Route 
                                    exact 
                                    path='/u/:username/' 
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'}
                                                info='user'
                                                user={props.match.params.username}
                                            >
                                                <Profile username={props.match.params.username} />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route 
                                    exact 
                                    path='/u/:username/edit/' 
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'}
                                                info='user'
                                                user={props.match.params.username}
                                            >
                                                <EditProfile 
                                                    user={props.match.params.username}
                                                    context={context}
                                                />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/r/:subreddit/new/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info='subreddit'
                                                dont_ask_new_post = {true}
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <EditCreatePost context={context}/>
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/r/:subreddit/post/:postid/edit/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info='subreddit'
                                                dont_ask_new_post = {true}
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <EditCreatePost 
                                                    update={true}
                                                    context={context}
                                                    subreddit={props.match.params.subreddit}
                                                    postid={props.match.params.postid}    
                                                />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/r/:subreddit/post/:postid/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info='subreddit'
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <PostExpanded
                                                    subreddit={props.match.params.subreddit}
                                                    postid={props.match.params.postid}
                                                />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/r/:subreddit/edit/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info={false}
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <EditCreateSubreddit
                                                    update={true}
                                                    context={context}
                                                    subreddit={props.match.params.subreddit}
                                                />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path='/r/:subreddit/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info='subreddit'
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <Subreddit 
                                                    update={false}
                                                    subreddit={props.match.params.subreddit} 
                                                />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/new/'
                                    render={(props) => {
                                        return (
                                            <Wrapper
                                                setActiveTab={context.toggleTab}
                                                activeTab={'4'}
                                                info='new'
                                                dontshow={true}
                                            >
                                                <EditCreatePost context={context}/>
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/r/Select an Option/new/'
                                    render = {() => 
                                        <React.Fragment>
                                            {this.props.history.push('/new/')}
                                        </React.Fragment>
                                    }
                                />
                                <Route
                                    exact
                                    path = '/about/'
                                    render = {() =>
                                        <Wrapper
                                            setActiveTab={context.toggleTab}
                                            activeTab={'4'}
                                            info={false}
                                            dontshow={true}
                                            >
                                            <About />
                                        </Wrapper>
                                    }
                                />
                                <Route
                                    exact
                                    path = '/help/'
                                    render = {() =>
                                        <Wrapper
                                            setActiveTab={context.toggleTab}
                                            activeTab={'4'}
                                            info={false}
                                            dontshow={true}
                                            >
                                            <Help />
                                        </Wrapper>
                                    }
                                />
                                <Route
                                    exact
                                    path = '/create/'
                                    render = {() =>
                                        <Wrapper
                                            setActiveTab={context.toggleTab}
                                            activeTab={'4'}
                                            info={false}
                                            dontshow={true}
                                            >
                                            <EditCreateSubreddit context={context}/>
                                        </Wrapper>
                                    }
                                />
                                <Route
                                    exact
                                    path = '/search/:keyword/'
                                    render = {(props) => 
                                        <Wrapper
                                            setActiveTab={context.toggleTab}
                                            activeTab={'4'}
                                            info='haha'
                                            >
                                            <SearchPage 
                                                keyword={props.match.params.keyword}
                                            />
                                        </Wrapper>
                                    }
                                />
                            </Switch>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(BodyComponent)