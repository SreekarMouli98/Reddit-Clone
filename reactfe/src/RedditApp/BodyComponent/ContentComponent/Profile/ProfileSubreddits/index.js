import React, {Component} from 'react'
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import {
    withRouter
} from 'react-router'
import AlertTemplate from '../../assets/AlertTemplate'

class ProfileSubreddits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: []
        }
    }

    fetchSubreddits(username) {
        fetch(`/api/reddit/u/${username}/subreddits/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddits: json
            })
        })
    }

    componentDidMount() {
        this.fetchSubreddits(this.props.username)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchSubreddits(nextProps.username)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.subreddits.length !== 0 ?
                    <ListGroup>
                        {this.state.subreddits.map((subreddit) => {
                            return (
                                <ListGroupItem 
                                    key={subreddit.id}
                                    tag='a'
                                    href='#'
                                    onClick={(event) => {
                                        event.preventDefault()
                                        this.props.history.push(`/r/${subreddit.name}/`)
                                    }}
                                >
                                    r/{subreddit.name}
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                    :
                    <AlertTemplate>
                        <hr />
                        <h3 className='text-center'>
                            User doesn't own any subreddits!
                        </h3>
                        <hr />
                    </AlertTemplate>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(ProfileSubreddits)