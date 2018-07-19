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

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            subreddit_selected: '',
            title: '',
            content: '',
            username: '',
        }
    }

    componentDidMount() {
        fetch('/api/reddit/r/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddits: json,
            })
        })
    }

    handleSubredditSelect(event) {
        this.setState({
            subreddit_selected: event.target.value,
        }, () => 
            this.props.history.push(`/${this.state.subreddit_selected}/new/`)
        )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let data = {
            title: this.state.title,
            content: this.state.content,
            votes: 0,
            profile: this.props.username,
            subreddit: this.state.subreddit_selected,
        }
        fetch(`/api/reddit/r/${this.state.subreddit_selected}/posts/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:data
        })
        .then(res => {
            res.status >= 200 && res.status <= 300 ?
                this.props.history.push(`/r/${data.subreddit}/`)                
            :
                console.log('Something went wrong!')
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (    
                        <Form>
                            <FormGroup row>
                                <Col sm={5}>
                                    <Input 
                                        type="select"
                                        onChange={(e) => this.handleSubredditSelect(e)}
                                        > 
                                        <option key='0'>Select an Option</option>
                                        {this.state.subreddits.map((subreddit) => {
                                            return (
                                                <option key={subreddit.id}>{'r/' + subreddit.name}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Input name='title' type='text' placeholder='Title' />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Input name='content' type='textarea' placeholder='Content' rows='10'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button 
                                        block
                                        color='primary' 
                                        onClick={() => {
                                            context.loggedIn ?
                                                context.toggleLoginModal()
                                                :
                                                this.handleSubmit()
                                        }} 
                                        >
                                        POST
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        )
                    }}
                </Context.Consumer>
        )
    }
}

export default withRouter(NewPost)