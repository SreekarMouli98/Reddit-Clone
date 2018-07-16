import React, {Component} from 'react'
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    Col,
} from 'reactstrap'

export default class NewComment extends Component {
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