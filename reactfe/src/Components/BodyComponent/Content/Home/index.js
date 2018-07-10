import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Container,
    Alert,
} from 'reactstrap'

export default class Home extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <h1 className='display-1 text-center'>Welcome to Reddit</h1>
                            {context.loggedIn ? 
                                <React.Fragment>
                                    <Alert color='success'>User logged in</Alert>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Alert color='danger'>Please Login</Alert>
                                </React.Fragment>                            
                            }
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}