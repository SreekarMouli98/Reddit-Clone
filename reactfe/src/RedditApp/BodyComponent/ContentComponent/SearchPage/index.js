import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardHeader,
    CardBody,
    ListGroupItem,
    Collapse
} from 'reactstrap'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            users: [],
            filteredSubreddits: [],
            filteredUsers: [],
            subredditOpen: true,
            usersOpen: false,
        }
        this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    fetchData() {
        fetch('/api/reddit/r/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddits: json,
                filteredSubreddits: this.filterSubreddits(json)
            })
        })
        fetch('/api/reddit/u/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                users: json,
                filteredUsers: this.filterUsers(json)
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

    toggleCollapse() {
        this.setState(prev => ({
            subredditOpen: !prev.subredditOpen,
            usersOpen: !prev.usersOpen
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Card
                    className='cursor-on-hover'
                    onClick={this.toggleCollapse}
                    >
                    <CardHeader>
                        Subreddits
                    </CardHeader>
                </Card>
                <Collapse isOpen={this.state.subredditOpen}>
                    <Card>
                        <CardBody>
                            {this.state.filteredSubreddits.length !== 0 ?
                                this.state.filteredSubreddits.map((subreddit) => {
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
                                })
                                :
                                <ListGroupItem>No such subreddits</ListGroupItem>
                            }
                        </CardBody>
                    </Card>
                </Collapse>
                <Card
                    className='cursor-on-hover'
                    onClick={this.toggleCollapse}
                    >
                    <CardHeader>
                        Users
                    </CardHeader>
                </Card>
                <Collapse isOpen={this.state.usersOpen}>
                    <Card>
                        <CardBody>
                            {this.state.filteredUsers.length !== 0 ? 
                                this.state.filteredUsers.map((user) => {
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
                                })
                                :
                                <ListGroupItem>No such users</ListGroupItem>
                            }
                        </CardBody>
                    </Card>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchPage)