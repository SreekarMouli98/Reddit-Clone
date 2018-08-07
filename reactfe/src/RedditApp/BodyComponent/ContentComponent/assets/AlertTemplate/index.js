import React, {Component} from 'react'
import {
    Alert
} from 'reactstrap'

export default class AlertTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibile: true
        }
        this.dismiss = this.dismiss.bind(this)
    } 

    dismiss() {
        this.setState({
            visibile: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isDismissable ? 
                    <Alert color={this.props.color} isOpen={this.state.visibile} toggle={this.dismiss}>
                        {this.props.children}
                    </Alert>
                    :
                    <Alert color={this.props.color}>
                        {this.props.children}
                    </Alert>
                }
            </React.Fragment>
        )
    }
}