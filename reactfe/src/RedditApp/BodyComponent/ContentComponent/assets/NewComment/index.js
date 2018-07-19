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

class NewComment extends Component {
    handleSubmit() {
        this.props.history.push(`/r/${this.props.match.params.subreddit}/posts/${this.props.match.params.postid}/`)        
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Col>
                                    <Input type='textarea' width='20' height='10' placeholder='What are your thoughts?'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button 
                                        color='primary' 
                                        onClick = {() => {
                                            console.log('comment submitted')
                                        }}
                                    >COMMENT</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(NewComment)