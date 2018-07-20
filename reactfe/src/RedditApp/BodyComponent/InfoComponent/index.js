import React, {Component} from 'react'
import Context from '../../../provider'
import AboutUsCard from './AboutUsCard'
import NewSubredditCard from './NewSubredditCard'
import SubredditCard from './SubredditCard'
import UserCard from './UserCard'
import NewPostDetailCard from './NewPostDetailCard'

class SubredditHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddit: '', 
            profile: {
                username: '',
            },
            rules: [],
        }
    }

    fetchSubredditData(subreddit) {
        fetch(`/api/reddit/r/${subreddit}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddit: json,
                profile: json.profile
            })
        })
        .then(() => {
                if (this.state.subreddit.rules !== '') {
                    this.setState({
                        rules: this.state.subreddit.rules.split(';')
                    })
                }
            }
        )
    }

    componentWillReceiveProps(nextProps) {
        this.fetchSubredditData(nextProps.subreddit)
    }

    componentDidMount() {
        this.fetchSubredditData(this.props.subreddit)
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <SubredditCard
                                name = {this.state.subreddit.name}
                                description = {this.state.subreddit.description}
                                provide_link = {true}
                                can_subscribe = {context.username !== this.state.profile.username}
                                ask_new_post = {this.props.dont_ask_new_post === true ? false : true}
                                // If you get an error here, that probably means that the json data was wrong!!
                                can_edit={context.username === this.state.profile.username && context.loggedIn === true}
                                can_delete={context.username === this.state.profile.username && context.loggedIn === true}
                                show_rules = {this.state.rules.length !== 0}
                                rules = {this.state.rules}
                            />      
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

class UserHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile:''
        }       
    }

    fetchUser(user) {
        fetch(`/api/reddit/u/${user}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({profile: json})
        })
    }

    componentDidMount() {
        this.fetchUser(this.props.user)
    }
    
    componentWillReceiveProps(nextProps) {
        this.fetchUser(nextProps.user)
    }

    render() {
        var {profile} = this.state
        return (
            <UserCard
                username={profile.username}
                karma={profile.karma}
                dob={profile.dob}
            />
        )
    }
}

export default class InfoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: 'home'
        }
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
                    <SubredditCard
                        name = 'Home'
                        description = 'Your personal Reddit frontpage. Come here to check in with your favorite communities.'
                        provide_link = {false}
                        can_subscribe = {false}
                        ask_new_post = {true}
                        show_rules = {false}
                    />
                )
                break

            case 'popular':
                return (
                    <SubredditCard
                        name = 'Popular'
                        description='The best posts on Reddit for you, pulled from the most active communities on Reddit. Check here to see the most shared, upvoted, and commented content on the internet.'
                        provide_link = {false}
                        can_subscribe = {false}
                        ask_new_post = {true}
                        show_rules = {false}
                    />
                )
                break

            case 'all':
                return (
                    <SubredditCard
                        name = 'All'
                        description = 'The most active posts from all of Reddit. Come here to see new posts rising and be a part of the conversation.'
                        provide_link = {false}
                        can_subscribe = {false}
                        ask_new_post = {true}
                        show_rules = {false}
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
                return <NewPostDetailCard />
                break

            default:
                return <div>ERROR</div>
                break
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.render_switch(this.state)}
                <NewSubredditCard />
                <AboutUsCard/>
            </React.Fragment>
        )
    }
}