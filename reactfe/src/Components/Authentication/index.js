import React, {Component} from 'react'
import Context from '../provider'

export default class Authentication extends Component {
    render() {
        return (
            <Context.Consumer>
                {context=> {
                    return (
                        <div>{() => context.toggleLoginModal()}</div>
                    )}
                }
            </Context.Consumer>
        )
    }
}