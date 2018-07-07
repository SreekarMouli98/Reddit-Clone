import React, {Component} from 'react';
import {Card, CardHeader, CardBody, CardLink, CardTitle, CardText, Container, CardImgOverlay, Row, Col} from 'reactstrap'

class CardComponent extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <CardBody>
                        <Row>
                            <Col sm={1}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Col>
                            <Col sm={10}><CardTitle>{this.props.title}</CardTitle></Col>
                        </Row>
                        <Row>
                            <Col sm={1}><CardText>{this.props.votes}</CardText></Col>
                            <Col sm={10}><CardText>{this.props.content}</CardText></Col>
                        </Row>
                        <Row>
                            <Col sm={1}><CardText><i className="fa fa-thumbs-down" aria-hidden="true"></i></CardText></Col>
                            <Col sm={10}>
                                <CardLink href={'/' + this.props.subredditlink + '/'}>{this.props.subredditlink}</CardLink>
                                <CardLink href={'/' + this.props.userlink + '/'}>{this.props.userlink}</CardLink>                            
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default CardComponent;   