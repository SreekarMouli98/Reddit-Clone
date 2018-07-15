import React, { Component } from 'react'
import {
    Provider,
} from '../provider'
import {
    Container,
} from 'reactstrap'
import HeaderComponent from './HeaderComponent'
import BodyComponent from './BodyComponent'


export default class RedditApp extends Component {
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