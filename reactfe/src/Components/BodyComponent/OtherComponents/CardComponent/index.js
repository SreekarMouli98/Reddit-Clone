import React, {Component} from 'react';
import {
    Container,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardLink,
    Table,
    Row,
    Col,
} from 'reactstrap'
import Context from '../../../provider'
import './style.css'

class CardComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <td className='fixed-width'><i className="fa fa-thumbs-up" aria-hidden="true"></i></td>
                                    <td rowSpan='3'>
                                        <Card>
                                            <CardBody>
                                                <CardTitle>{this.props.title}</CardTitle>
                                                <CardText>{this.props.content}</CardText>
                                                <CardLink 
                                                    href={'/' + this.props.subredditlink + '/'}
                                                    onClick={() => context.toggleUserSelected(this.props.ownerid)}
                                                >{this.props.subredditlink}</CardLink>
                                                <CardLink href={'/' + this.props.userlink + '/'}>{this.props.userlink}</CardLink> 
                                            </CardBody>
                                        </Card>
                                    </td>
                                </tr>
                                <tr><td className='fixed-width'>{this.props.votes}</td></tr>
                                <tr><td className='fixed-width'><i className="fa fa-thumbs-down" aria-hidden="true"></i></td></tr>
                            </tbody>
                        </Table>
                        // <Container>
                        //     <Card>
                        //         <CardBody>
                        //             <Row>
                        //                 <Col sm={1}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Col>
                        //                 <Col sm={10}><CardTitle>{this.props.title}</CardTitle></Col>
                        //             </Row>
                        //             <Row>
                        //                 <Col sm={1}>{this.props.votes}</Col>
                        //                 <Col sm={10}><CardText>{this.props.content}</CardText></Col>
                        //             </Row>
                        //             <Row>
                        //                 <Col sm={1}><CardText><i className="fa fa-thumbs-down" aria-hidden="true"></i></CardText></Col>
                        //                 <Col sm={10}>
                        //                     <CardLink 
                        //                         href={'/' + this.props.subredditlink + '/'}
                        //                         onClick={() => context.toggleUserSelected(this.props.ownerid)}
                        //                     >{this.props.subredditlink}</CardLink>
                        //                     <CardLink href={'/' + this.props.userlink + '/'}>{this.props.userlink}</CardLink>                            
                        //                 </Col>
                        //             </Row>
                        //         </CardBody>
                        //     </Card>
                        // </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default CardComponent;   