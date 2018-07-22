import React, {Component} from 'react'
import {
    Form,
    FormGroup,
    Input,
    Button,
    Col,
} from 'reactstrap'
import {
    withRouter,
} from 'react-router'
import Context from '../../../../../provider'

class EditCreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            subreddit_selected: '',
            subreddit_id: 0,
            title: '',
            content: '',
            votes: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubredditSelect = this.handleSubredditSelect.bind(this)
    }

    componentDidMount() {
        if (this.props.update) {
            fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`)
            .then(data => data.json())
            .then(json => {
                console.log()
                this.setState({
                    title: json.title,
                    content: json.content,
                    votes: json.votes,
                    subreddit_id: json.subreddit.id,
                    subreddit_selected: 'r/' + json.subreddit.name
                })
            })
            .then(() => document.getElementById('options').innerHTML = this.state.subreddit_selected)
        }
        else {
            fetch('/api/reddit/r/')
            .then(data => data.json())
            .then(json => {
                this.setState({
                    subreddits: json,
                })
            })
        }
    }

    handleSubredditSelect(event) {
        this.setState({
            subreddit_selected: event.target.value,
            subreddit_id: event.target[event.target.selectedIndex].id
        }, () => 
                this.props.history.push(`/${this.state.subreddit_selected}/new/`)
        )
    }

    success() {
        this.props.history.push(`/${this.state.subreddit_selected}/`)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(context) {
        let json = {
            title: this.state.title,
            content: this.state.content,
            votes: this.state.votes,
            profile: context.userId,
            subreddit: Number(this.state.subreddit_id),
        }
        if (this.props.update === false) {
            json['upvotes'] = [context.userId]
        }
        json = JSON.stringify(json)
        const url = `/api/reddit/${this.state.subreddit_selected}/posts/${this.props.update ? this.props.postid + '/' : ''}`
        fetch(url, {
            method: this.props.update ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:json
        })
        .then(response => {
            response.ok ?
                response.json().then(json => this.success())
            :
                console.log(response)
        })
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    context.loggedIn ?
                                        this.handleSubmit(context)
                                        :
                                        context.toggleLoginModal()
                                }}
                            >
                                <FormGroup row>
                                    <Col sm={7}>
                                        <Input 
                                            type="select"
                                            onChange={this.handleSubredditSelect}
                                            required
                                        > 
                                            <option id='options' key='0' disabled selected>Select an Option</option>
                                            {this.state.subreddits.map((subreddit) => {
                                                return (
                                                    <option key={subreddit.id} id={subreddit.id}>{'r/' + subreddit.name}</option>
                                                )
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Input 
                                            name='title' 
                                            type='text' 
                                            placeholder='Title'
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Input 
                                            name='content' 
                                            type='textarea' 
                                            placeholder='Content'
                                            value={this.state.content}
                                            onChange={this.handleChange}
                                            rows='10'
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Button 
                                            block
                                            color='secondary' 
                                            onClick={() => this.props.history.push('/')}
                                        >
                                            CANCEL
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            block
                                            color='primary' 
                                        >
                                            {this.props.update ? 'DONE' : 'POST'}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </React.Fragment>
                        )
                    }}
                </Context.Consumer>
        )
    }
}

export default withRouter(EditCreatePost)