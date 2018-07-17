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
import Profile from './ContentComponent/Profile'
import Subreddit from './ContentComponent/Subreddit'
import PostExpanded from './ContentComponent/PostExpanded'
import InfoComponent  from './InfoComponent'
import SwitchTab from './ContentComponent/Subreddit/SwitchTab'
import NewPost from './ContentComponent/assets/NewPost'
import EditProfile from './ContentComponent/assets/EditProfile'
import About from './ContentComponent/assets/About'
import Help from './ContentComponent/assets/Help'
import NewSubreddit from './ContentComponent/assets/NewSubreddit'
import './style.css'

class Wrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: 'home',
            otherProps: [],
        }
    }

    componentDidMount() {
        this.props.setActiveTab(this.props.activeTab);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            info: nextProps.info,
            otherProps: nextProps
        })
        console.log(...this.props)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.info ?
                    <Row>
                        <Col md='8' id='content-block'>
                            <SwitchTab />
                            {this.props.children}
                        </Col>
                        <Col md='4' id='info-block'>
                            <InfoComponent info={this.props.info} {...this.props}/>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col>
                            <SwitchTab />
                            {this.props.children}
                        </Col>
                    </Row>
                }
            </React.Fragment>
        )
    }
}

export default class BodyComponent extends Component {
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
                                        <Redirect to='r/home/' />
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
                                                <EditProfile user={props.match.params.username}/>
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
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <NewPost />
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
                                    path='/r/:subreddit/'
                                    render={(props) => {
                                        return (
                                            <Wrapper 
                                                setActiveTab={context.toggleTab} 
                                                activeTab={'4'} 
                                                info='subreddit'
                                                subreddit={props.match.params.subreddit}
                                            >
                                                <Subreddit subreddit={props.match.params.subreddit} />
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
                                            >
                                                <NewPost />
                                            </Wrapper>
                                        )
                                    }}
                                />
                                <Route
                                    exact
                                    path = '/Select acn Option/new/'
                                    render = {() => 
                                        <Redirect to ='/new/' />
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
                                        >
                                            <NewSubreddit />
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