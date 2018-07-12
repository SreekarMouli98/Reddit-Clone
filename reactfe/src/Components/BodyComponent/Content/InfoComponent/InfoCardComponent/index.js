import React, {Component} from 'react'
import {
    Card,
    CardTitle,
    CardBody,
    CardText,
    Button,
} from 'reactstrap'

export default class InfoCardComponent extends Component {
    render() {
        return (
            <Card>
                <CardTitle><CardText className='text-centered'>{this.props.title}</CardText></CardTitle>
                <CardBody>
                    <CardText>{this.props.content}</CardText>
                    <Button color='light'>{this.props.button}</Button>
                </CardBody>
            </Card>            
        )
    }
}