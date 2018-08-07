import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import Context from '../../../../../provider' 
import {
    Container,
    ButtonGroup,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap'
import Search from '../../../../HeaderComponent/NavbarComponent/Search'
import './style.css'

class Bottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
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
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Bottom)