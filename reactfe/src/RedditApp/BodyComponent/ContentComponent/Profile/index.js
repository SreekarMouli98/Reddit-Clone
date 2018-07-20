import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    Button,
} from 'reactstrap'
import {
    withRouter
} from 'react-router'
import classnames from 'classnames'
import ProfilePosts from './ProfilePosts'
import ProfileComments from './ProfileComments'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {profile: '', user: ''}
    }

    fetchProfile(username) {
        fetch(`/api/reddit/u/${username}/`)
        .then(data => data.json())
        .then((profile) => {
            this.setState({
                profile: profile,
                user: profile.user,
            })
        })
    }

    componentDidMount() {
        this.fetchProfile(this.props.username)
    }

    componentWillReceiveProps(nextProps) {
        this.fetchProfile(nextProps.username)
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Navbar>
                                {(this.state.user.first_name !== '' || this.state.user.last_name !== '') ?
                                    <NavbarBrand>{this.state.user.first_name} {this.state.user.last_name}'s Profile</NavbarBrand>
                                    :
                                    <NavbarBrand>{this.state.profile.username}'s Profile</NavbarBrand>
                                }

                                {context.loggedIn && context.username === this.state.profile.username && 
                                    <Button
                                        color='danger'    
                                        onClick= {() => {
                                            this.props.history.push('edit/')
                                        }}
                                    >
                                        EDIT PROFILE
                                    </Button>
                                }
                            </Navbar>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink 
                                        onClick={() => {context.toggleProfileTab('1')}}
                                        className={classnames({active: context.profileTab === '1'})}
                                    >
                                        Posts
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        onClick={() => {context.toggleProfileTab('2')}}
                                        className={classnames({active: context.profileTab === '2'})}
                                    >
                                        Comments
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {context.profileTab === '1' ?
                                <ProfilePosts username={this.props.username}/>
                                :
                                <ProfileComments username={this.props.username} />
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Profile)