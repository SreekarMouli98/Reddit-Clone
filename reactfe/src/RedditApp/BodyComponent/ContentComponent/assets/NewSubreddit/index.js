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

export default class NewSubreddit extends Component {
    constructor(props) {
        super(props)
        this.state = {rules: [], rule_count: 0}
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
                            <Input type='text' placeholder='Name of the Subreddit'/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Description</Label>
                        <Col sm={10}>
                            <Input type='textarea' placeholder='Provide a description of your subreddit.'/> 
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
                            <Button color='primary'>CREATE</Button>
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