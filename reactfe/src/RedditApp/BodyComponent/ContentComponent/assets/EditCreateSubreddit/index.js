import React, {Component} from 'react'
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

export default class EditCreateSubreddit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddit: '',
            rules: [],
        }
    }

    fill_form() {
        document.getElementById('subreddit-name').value = this.state.subreddit.name
        document.getElementById('subreddit-description').value = this.state.subreddit.description
        this.setState({
            rules: this.state.subreddit.rules.split(';')
        })

    }

    componentDidMount() {
        if (this.props.update) {
            console.log('update mode')
            fetch(`/api/reddit/r/${this.props.subreddit}/`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    subreddit: json,
                })
            })
            .then(() => this.fill_form())
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
        console.log(this.state)
    }

    deleteRule(rule) {
        this.setState(previousState => {
            return {
                rules: previousState.rules.filter(r => r !== rule)
            };
        });
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup row>
                        <Label sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type='text' id='subreddit-name' placeholder='Name of the Subreddit'/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Description</Label>
                        <Col sm={10}>
                            <Input type='textarea' id='subreddit-description' placeholder='Provide a description of your subreddit.'/> 
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
                        <Col sm={{size:12, offset:11}}>
                            <Button color='primary'>{this.props.update ? 'UPDATE': 'CREATE'}</Button>
                        </Col>
                    </FormGroup>    
                    {this.state.rules.map(rule => (
                        <Alert
                            color='info'
                            key={rule}
                            isOpen={true}
                            toggle={() => this.deleteRule(rule)}
                        >
                            {rule}
                        </Alert>
                    ))}
                </Form>   
            </React.Fragment>
        )
    }
}   