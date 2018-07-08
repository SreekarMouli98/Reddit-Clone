import React, {Component} from 'react'
import Context from '../../../provider'
import {Container} from 'reactstrap'

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('')
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container fluid>
                            <h1>{context.toggleTab('4')}{this.props.match.params.username}'s Profile</h1>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}