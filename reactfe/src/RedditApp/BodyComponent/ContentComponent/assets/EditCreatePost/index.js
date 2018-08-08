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
            upvotes: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubredditSelect = this.handleSubredditSelect.bind(this)
    }

    getIds(json) {
        let ls = []
        if (json) {
            for (var i = 0; i < json.length; i++) {
                ls[i] = json[i]['id']
            }
        }
        return ls
    } 

    componentDidMount() {
        if (localStorage.getItem('token') === null) {
            this.props.history.push('/')
        }
        if (this.props.update) {
            fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    title: json.title,
                    content: json.content,
                    upvotes: this.getIds(json.upvotes),
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

    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('token') === null) {
            this.props.history.push('/')
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
            profile: context.userId,
            subreddit: Number(this.state.subreddit_id),
            upvotes: this.props.update ? this.state.upvotes : this.state.upvotes.concat(context.userId),
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
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
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
                                        this.state.subreddit_selected.length === 0 ?
                                            console.log('select subreddit')
                                            :
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
                                            placeholder='Title (no spaces)'
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