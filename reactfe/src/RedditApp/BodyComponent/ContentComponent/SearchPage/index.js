import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardHeader,
    CardBody,
    ListGroupItem,
} from 'reactstrap'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            users: []
        }
    }

    fetchData() {
        fetch('/api/reddit/r/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddits: json
            })
        })
        fetch('/api/reddit/u/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                users: json
            })
        })
    }

    componentDidMount() {
        this.fetchData()        
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData()
    }

    filterSubreddits() {
        let filtered = this.state.subreddits.filter((subreddit) => 
            subreddit.name.toLowerCase().indexOf(this.props.keyword.toLowerCase()) !== -1
        )
        return filtered
    }

    filterUsers() {
        let filtered = this.state.users.filter((user) => 
            user.username.toLowerCase().indexOf(this.props.keyword.toLowerCase()) !== -1
        )
        return filtered
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        Subreddits
                    </CardHeader>
                </Card>
                <Card>
                    <CardBody>
                        {this.filterSubreddits().map((subreddit) => {
                            return (
                                <ListGroupItem key={subreddit.id}>
                                    <a
                                        href='#'
                                        className='black-text black-text-on-hover'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            this.props.history.push(`/r/${subreddit.name}/`)
                                        }}
                                        >
                                        r/{subreddit.name}
                                    </a>
                                </ListGroupItem>
                            )
                        })}
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        Users
                    </CardHeader>
                </Card>
                <Card>
                    <CardBody>
                        {this.filterUsers().map((user) => {
                            return (
                                <ListGroupItem key={user.id}>
                                    <a
                                        href='#'
                                        className='black-text black-text-on-hover'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            this.props.history.push(`/u/${user.username}/`)
                                        }}
                                        >
                                        {user.username}
                                    </a>
                                </ListGroupItem>
                            )
                        })}
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchPage)