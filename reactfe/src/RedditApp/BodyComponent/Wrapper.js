import React, {Component} from 'react'
import Context from '../../provider'
import {
    withRouter
} from  'react-router'
import {
    Container,
    Row,
    Col,
    ButtonGroup,
    Button,
    InputGroup,
    Input,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap'
import InfoComponent from './InfoComponent'
import SwitchTab from './ContentComponent/Subreddit/SwitchTab'
import Search from '../HeaderComponent/NavbarComponent/Search'

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
            <Context.Consumer>
                {context => {
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
                            {!this.props.dontshow &&
                                <ButtonGroup vertical id='my-shortcut'>
                                    <Button color="primary" onClick={this.toggleSearch}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </Button>
                                    <Modal isOpen={this.state.searchOpen} toggle={this.toggleSearch} centered>
                                        <ModalHeader toggle={this.toggleSearch}>Search Reddit</ModalHeader>
                                        <ModalBody>
                                            <Search 
                                                btn={true} 
                                                callback_function = {this.toggleSearch}
                                            />
                                        </ModalBody>
                                    </Modal>
                                    <ButtonDropdown 
                                        direction='left' 
                                        isOpen={this.state.shortcutOpen} 
                                        toggle={() => {
                                            context.loggedIn ?
                                            this.toggleShortcut()
                                            :
                                            context.toggleLoginModal()
                                        }}
                                        >
                                        <DropdownToggle color='primary'>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <Container fluid>
                                                <ButtonGroup>
                                                    <Button 
                                                        color='primary' 
                                                        onClick={() => {
                                                            this.props.history.push('/new/')
                                                            this.toggleShortcut()
                                                        }}
                                                        >
                                                        Post
                                                    </Button>
                                                    <Button 
                                                        color='primary'
                                                        onClick={() => {
                                                            this.props.history.push('/create/')
                                                            this.toggleShortcut()
                                                        }}
                                                        >
                                                        Subreddit
                                                    </Button>
                                                </ButtonGroup>
                                            </Container>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </ButtonGroup>
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Wrapper)