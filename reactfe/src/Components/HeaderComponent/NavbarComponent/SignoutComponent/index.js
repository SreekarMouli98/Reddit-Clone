import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Button,
} from 'reactstrap'

export default class SignoutComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Button color='alert' onClick={() => context.toggleLoggedIn()}>Signout</Button>
                    )
                }}
            </Context.Consumer>
        )
    }
}