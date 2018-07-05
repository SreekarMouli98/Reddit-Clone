import React, {Component} from 'react';
import {Card, CardBody, CardLink, CardTitle, CardText, Container} from 'reactstrap'

class CardComponent extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText>{this.props.content}</CardText>
                        <CardLink href='/'>{this.props.subredditlink}</CardLink>
                        <CardLink href='/'>{this.props.userlink}</CardLink>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default CardComponent;   