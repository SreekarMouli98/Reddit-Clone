import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Button,
} from 'reactstrap'

export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(context) {
        localStorage.removeItem('token')
        context.toggleLoggedIn()
        context.setUsername('')
        context.setUserId(0)
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Button 
                            color='alert' 
                            onClick={() => 
                                this.handleSubmit(context)
                            }
                            >
                            Signout
                        </Button>
                    )
                }}
            </Context.Consumer>
        )
    }
}