import React, {Component} from 'react'
import Context from '../../../../provider'
import {
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    ButtonGroup,
    Button,
} from 'reactstrap'
import {
    withRouter
} from 'react-router'
import classnames from 'classnames'
import ProfilePosts from './ProfilePosts'
import ProfileComments from './ProfileComments'
import ProfileSubreddits from './ProfileSubreddits'
import DeleteTemplate from '../assets/DeleteTemplate';

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
                                    <ButtonGroup>
                                        <Button
                                            color='info'    
                                            onClick= {() => {
                                                this.props.history.push(`/u/${this.state.profile.username}/edit/`)
                                            }}
                                        >
                                            EDIT
                                        </Button>
                                        <DeleteTemplate
                                            button={true}
                                            block={false}
                                            toDeleteURL={`/api/reddit/u/${this.state.profile.username}/`}
                                            successURL={'/'}
                                            forceLogout={true}
                                        />
                                    </ButtonGroup>
                                }
                            </Navbar>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({active: context.profileTab === '1'})}
                                        href='#'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            context.toggleProfileTab('1')
                                        }}
                                    >
                                        Posts
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({active: context.profileTab === '2'})}
                                        href='#'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            context.toggleProfileTab('2')
                                        }}
                                    >
                                        Comments
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({active: context.profileTab === '3'})}
                                        href='#'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            context.toggleProfileTab('3')
                                        }}
                                    >
                                        Subreddits
                                    </NavLink>
                                </NavItem>                                
                            </Nav>
                            {context.profileTab === '1' ?
                                <ProfilePosts username={this.props.username}/>
                                :
                                context.profileTab === '2' ?
                                    <ProfileComments username={this.props.username} />
                                    :
                                    <ProfileSubreddits username={this.props.username} />
                            }
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Profile)