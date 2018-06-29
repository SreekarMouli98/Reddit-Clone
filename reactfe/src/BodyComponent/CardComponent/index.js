import React, {Component} from 'react';
import {
    Card, CardBody, CardLink, CardTitle, CardText 
} from 'reactstrap'

class CardComponent extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Post-title</CardTitle>
                    <CardText>Post-content</CardText>
                    <CardLink href='/'>Subreddit Link</CardLink>
                    <CardLink href='/'>User Link</CardLink>
                </CardBody>
            </Card>
        )
    }
}

export default CardComponent;   