import React, {Component} from 'react';

const Context = React.createContext();

class Provider extends Component {
  state = {
  
    loggedIn: false,
    username: 'Mouli',
    password: '',
    loginModalOpen: false,
    signupModalOpen: false,
    navbarOpen: false,
    activeTab: '1',
    profileTab: '1',

    toggleLoggedIn: () => {
      this.setState({loggedIn: !this.state.loggedIn})
    },

    toggleLoginModal: () => {
      this.setState({loginModalOpen: !this.state.loginModalOpen})
    },

    toggleSignupModal: () => {
      this.setState({signupModalOpen: !this.state.signupModalOpen})
    },

    toggleNavbar: () => {
      this.setState({navbarOpen: !this.state.navbarOpen})
    },

    toggleTab: (tab) => {
      this.setState({activeTab: tab})
    },

    toggleProfileTab: (tab) => {
      this.setState({profileTab: tab})
    }
  }
  
  render() {
    return (
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
    )
  }
}

export {Provider};
export default Context;