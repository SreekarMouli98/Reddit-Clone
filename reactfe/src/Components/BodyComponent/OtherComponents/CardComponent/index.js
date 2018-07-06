import React, {Component} from 'react';
import {Card, CardHeader, CardBody, CardLink, CardTitle, CardText, Container, CardImgOverlay} from 'reactstrap'

class CardComponent extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <CardImgOverlay>
                        <CardText><i className="fa fa-thumbs-up" aria-hidden="true"></i></CardText>
                        <CardText>{this.props.votes}</CardText>
                        <CardText><i className="fa fa-thumbs-down" aria-hidden="true"></i></CardText>
                    </CardImgOverlay>
                    <CardBody className='ml-5'>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText>{this.props.content}</CardText>
                        <CardLink href={this.props.subredditlink}>subreddit</CardLink>
                        <CardLink href={this.props.userlink}>user</CardLink>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default CardComponent;   