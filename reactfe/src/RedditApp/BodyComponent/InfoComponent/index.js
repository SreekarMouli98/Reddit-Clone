import React, {Component} from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'
import InfoCard from './InfoCard'
import AboutUs from './AboutUs'

class SubredditHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }

    fetchSubredditData(subreddit) {
        fetch(`/api/reddit/r/${subreddit}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({data: json})
        })
    }

    componentWillReceiveProps(nextProps) {
        this.fetchSubredditData(nextProps.subreddit)
    }

    componentDidMount() {
        this.fetchSubredditData(this.props.subreddit)
    }

    render() {
        var {data} = this.state
        return (
            <React.Fragment>
                <InfoCard 
                    reddit={true}
                    redditlink={true}
                    title={data.name}
                    content={data.description}
                    subscribe={true}
                    newPostBtn={true}
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
            <InfoCard
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
        this.state = {info: 'home'}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            info: nextProps.info,
        })
    }

    render_switch({info}) {
        switch(info) {
            case 'home':
                return (
                    <InfoCard
                        reddit={true}
                        title='Home'
                        content = 'Your personal Reddit frontpage. Come here to check in with your favorite communities.'
                        newPostBtn={true}
                    />
                )
                break

            case 'popular':
                return (
                    <InfoCard
                        reddit={true}
                        title='Popular'
                        content='The best posts on Reddit for you, pulled from the most active communities on Reddit. Check here to see the most shared, upvoted, and commented content on the internet.'
                        newPostBtn={true}
                    />
                )
                break

            case 'all':
                return (
                    <InfoCard
                        reddit={true}
                        title='All'
                        content = 'The most active posts from all of Reddit. Come here to see new posts rising and be a part of the conversation.'
                        newPostBtn={true}
                    />
                )
                break

            case 'subreddit':
                return <SubredditHelper {...this.props} />
                break

            case 'user':
                return <UserHelper {...this.props} />
                break

            case 'new':
                return <InfoCard new={true} newPostBtn={false}/>
                break
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.render_switch(this.state)}
                <AboutUs id/>
            </React.Fragment>
        )
    }
}