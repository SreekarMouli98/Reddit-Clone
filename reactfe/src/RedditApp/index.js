import React, { Component } from 'react'
import {
    Provider,
} from '../provider'
import {
    Container,
} from 'reactstrap'
import {
  BrowserRouter,
} from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import BodyComponent from './BodyComponent'
import './style.css'

export default class RedditApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider>
            <Container>
              <HeaderComponent />
              <BodyComponent />
            </Container>
        </Provider>
      </BrowserRouter>
    );
  }
}