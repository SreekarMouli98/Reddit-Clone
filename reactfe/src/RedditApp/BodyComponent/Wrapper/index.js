import React, {Component} from 'react'
import {
    withRouter
} from  'react-router'
import {
    Row,
    Col,
} from 'reactstrap'
import InfoComponent from '../InfoComponent'
import SwitchTab from '../ContentComponent/Subreddit/SwitchTab'
import Shortcut from './Shortcut'

class Wrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: false,
            shortcutOpen: false,
            searchOpen: false
        }
        this.toggleShortcut = this.toggleShortcut.bind(this)
        this.toggleSearch = this.toggleSearch.bind(this)
    }

    toggleShortcut() {
        this.setState(prev => ({
            shortcutOpen: !prev.shortcutOpen
        }))
    }

    toggleSearch() {
        this.setState(prev=> ({
            searchOpen: !prev.searchOpen
        }))
    }

    changeTab(nextTab) {
        this.props.setActiveTab(nextTab)
    }

    changeInfo(info) {
        this.setState({info: info})
    }

    componentDidMount() {
        this.changeTab(this.props.activeTab)
        this.changeInfo(this.props.info)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeTab !== nextProps.activeTab) {
            this.changeTab(nextProps.activeTab)
        }
        this.changeInfo(nextProps.info)
    }

    render() {
        return (
            <React.Fragment>
                {this.props.info ?
                        <Row>
                            <Col md='8' id='content-block'>
                                <SwitchTab />
                                {this.props.children}
                            </Col>
                            <Col md='4' id='info-block'>
                                <InfoComponent info={this.state.info} {...this.props}/>
                            </Col>
                        </Row>
                    :
                        <Row>
                            <Col>
                                <SwitchTab />
                                {this.props.children}
                            </Col>
                        </Row>
                }
                <Shortcut 
                    {...this.props}
                    showTop={this.props.info !== false} 
                    showSub={this.props.info==='subreddit'}
                    showBottom={true}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(Wrapper)