import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    Col,
} from 'reactstrap'
import Context from '../../../../../provider'

class NewComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    success() {
        console.log('Comment success!')
        this.setState({
            content: '',
        })
        this.props.history.push(`/r/${this.props.subreddit}/post/${this.props.postid}/`)        
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(context) {
        let json = {
            content: this.state.content,
            votes: 0,
            profile: context.userId,
            parent_post: this.props.postid,
            parent_comment: null
        }
        json = JSON.stringify(json)
        fetch(`/api/reddit/r/${this.props.subreddit}/posts/${this.props.postid}/comments/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => {
            response.ok ?
                this.success()
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
                            <Card>
                                <CardBody>
                                    <Form
                                        onSubmit={(event) => {
                                            event.stopPropagation()
                                            event.preventDefault()
                                            context.loggedIn ? 
                                                this.handleSubmit(context)
                                                :
                                                context.toggleLoginModal()
                                        }}
                                        >
                                        <FormGroup row>
                                            <Col>
                                                <Input 
                                                    type='textarea' 
                                                    name='content'
                                                    value={this.state.content}
                                                    onChange={this.handleChange}
                                                    placeholder='What are your thoughts?'
                                                    />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col>
                                                <Button 
                                                    color='primary' 
                                                >
                                                    COMMENT
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(NewComment)