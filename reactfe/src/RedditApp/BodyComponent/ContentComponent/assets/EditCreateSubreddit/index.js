import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Form,
    Col,
    Label,
    FormGroup,
    Button,
    Alert,
    Input,
    Row,
} from 'reactstrap'
import Context from '../../../../../provider'

class EditCreateSubreddit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            rules: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    fillForm() {
        document.getElementById('subreddit-name').value = this.state.name
        document.getElementById('subreddit-description').value = this.state.description
    }

    fetchSubreddit(subreddit) {
        fetch(`/api/reddit/r/${subreddit}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                name: json.name,
                description: json.description,
                rules: json.rules !== '' ? json.rules.split(';') : [],
            })
        })
        .then(() => this.fillForm())
    }

    componentDidMount() {
        if (this.props.update) {
            this.fetchSubreddit(this.props.subreddit)
        }
    }
    
    addRule() {
        const rule = document.getElementById('new-rule').value
        if(rule) {
            this.setState(prev => ({
                rules: prev.rules.concat(rule),
            }))
            document.getElementById('new-rule').value = ''
        }
    }

    createSubredditSuccess() {
        this.props.history.push(`/r/${this.state.name}/`)
    }
    
    deleteRule(rule) {
        this.setState(previousState => {
            return {
                rules: previousState.rules.filter(r => r !== rule)
            };
        });
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    
    handleSubmit(context) {
        let json = {
            name: this.state.name,
            description: this.state.description,
            rules: this.state.rules.join(';'),
            profile: context.userId,
            subscribers: [context.userId],
            moderators: [],
        }
        json = JSON.stringify(json)
        let url = '/api/reddit/r/'
        if (this.props.update) url += this.props.subreddit + '/'

        fetch(url, {
            method: this.props.update ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json,
        })
        .then(response => {
            response.ok ?
                    response.json().then(json => this.createSubredditSuccess())
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
                                    <Label sm={2}>Name</Label>
                                    <Col sm={10}>
                                        <Input 
                                            type='text'
                                            id='subreddit-name'
                                            name='name' 
                                            placeholder='Name of the Subreddit (no spaces)' 
                                            onChange={this.handleChange}
                                            required
                                        /> 
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Description</Label>
                                    <Col sm={10}>
                                        <Input 
                                            type='textarea'
                                            id='subreddit-description'
                                            name='description' 
                                            placeholder='Provide a description of your subreddit.'
                                            onChange={this.handleChange}
                                            required
                                        /> 
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Rules</Label>
                                    <Col sm={10}>
                                        <Row>
                                            <Col sm={8}>
                                                <Input 
                                                    id='new-rule' 
                                                    type='text' 
                                                    placeholder='A brief description of the rules to be followed by community'
                                                />
                                            </Col>
                                            <Col>
                                                {this.state.rules.length < 4 && 
                                                    <Button color='success' onClick={() => this.addRule()}>ADD RULE</Button>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Button 
                                            color='danger'
                                            onClick={() => {
                                                this.props.history.push('/')
                                            }}
                                            block
                                        >
                                            CANCEL
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            color='primary'
                                            block
                                        >
                                            {this.props.update ? 'UPDATE': 'CREATE'}
                                        </Button>
                                    </Col>
                                </FormGroup>    
                            </Form>   
                            {this.state.rules.length > 0 && this.state.rules.map(rule => (
                                <Alert
                                color='info'
                                key={rule}
                                isOpen={true}
                                toggle={() => this.deleteRule(rule)}
                                >
                                    {rule}
                                </Alert>
                            ))}
                        </React.Fragment>
                )
            }}
        </Context.Consumer>
        )
    }
}   

export default withRouter(EditCreateSubreddit)