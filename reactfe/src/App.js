import React, { Component } from 'react'
import './App.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from './provider'
import HeaderComponent from './HeaderComponent'
import BodyComponent from './BodyComponent'
import {Container} from 'reactstrap'


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
