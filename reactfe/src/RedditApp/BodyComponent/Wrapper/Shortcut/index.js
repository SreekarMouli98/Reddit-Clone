import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import Top from './Top'
import Bottom from './Bottom'
import Context from '../../../../provider'

class Shortcut extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            {this.props.showTop && 
                                <Top
                                    {...this.props}
                                    context={context}                        
                                />
                            }
                            {this.props.showBottom && 
                                <Bottom 
                                />
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Shortcut)