import React, { Component } from 'react'
import './App.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from './Components/provider'
import {Container} from 'reactstrap'
import HeaderComponent from './Components/HeaderComponent'
import BodyComponent from './Components/BodyComponent'


class App extends Component {
  render() {
    return (
      <Provider>
          <Container>
            <HeaderComponent />
            <BodyComponent />
          </Container>
      </Provider>
    );
  }
}

export default App;
