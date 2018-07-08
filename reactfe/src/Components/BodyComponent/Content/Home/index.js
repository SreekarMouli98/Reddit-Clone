import React, {Component} from 'react'
import Context from '../../../provider'
import CardComponent from '../../OtherComponents/CardComponent'
import {
    Container,
} from 'reactstrap'

export default class Home extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container className='text-center'>
                            <h1 className='display-1'>Welcome to Reddit</h1>
                            {context.loggedIn ? 
                                <React.Fragment>
                                    <h1 className='display-4'>User logged in</h1>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <h1 className='display-4'>Please Login</h1>
                                </React.Fragment>                            
                            }
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}