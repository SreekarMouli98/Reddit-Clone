import React, {Component} from 'react';

const Context = React.createContext();

class Provider extends Component {
  state = {
    
    loginModalOpen: false,
    signupModalOpen: false,
    navbarOpen: false,
    activeTab: '1',

    toggleLoginModal: () => {
      this.setState({loginModalOpen: !this.state.loginModalOpen});
    },

    toggleSignupModal: () => {
      this.setState({signupModalOpen: !this.state.signupModalOpen});
    },


    toggleNavbar: () => {
      this.setState({navbarOpen: !this.state.navbarOpen})
    },

    toggleTab: (tab) => {
      if(this.state.activeTab !== tab) {
        this.setState({activeTab: tab});
      }
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