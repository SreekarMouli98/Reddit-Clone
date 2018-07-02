import React, {Component} from 'react'
import NavbarComponent from './NavbarComponent'
import TabComponent from './TabComponent'

export default class HeaderComponent extends Component {
    render() {
        const vert_align = {
            display: 'flex',
            flexDirection: 'column'
        }
        return (
            <div id='fixed-top' style={vert_align} fixed='top'>
                <NavbarComponent />
                <TabComponent />
            </div>
        )
    }
}
