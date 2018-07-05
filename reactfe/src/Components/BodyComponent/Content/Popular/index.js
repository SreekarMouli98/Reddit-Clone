import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'
import CardComponent from '../../OtherComponents/CardComponent'

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {   
        fetch('http://localhost:8000/api/reddit/r/popular/')
        .then(result => {
            return result.json();
        })
        .then(data => {
            this.setState({posts: data})
        })
    }
    
    render() {
        return (
            <React.Fragment>
                {this.state.posts.map((post) => {
                    return (
                        <Row key={post.id}>
                            <Col sm={12}>
                                <CardComponent title={post.title} content={post.content} subredditlink='/' userlink='/' />
                            </Col>
                        </Row>
                    )
                })}
            </React.Fragment>   
        )
    }
}