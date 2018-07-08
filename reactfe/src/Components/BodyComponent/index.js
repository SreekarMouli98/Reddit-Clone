import React, {Component} from 'react'
import Context from '../provider'
import SwitchTab from './OtherComponents/SwitchTab'
import { 
    BrowserRouter,
    Route,
    Redirect,
} from "react-router-dom"
import {
    Container,
} from 'reactstrap'
import ProfileComponent from './Content/ProfileComponent'

class Handler extends React.Component {
    componentDidMount() {
       this.props.setActiveTab(this.props.activeTab);
    }
  
    render() {
      return null;
    }
 }

export default class BodyComponent extends Component {
    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <Container>
                            <SwitchTab />
                            <BrowserRouter>
                                <React.Fragment>
                                    <Route 
                                        exact 
                                        path='/' 
                                        render={() =>
                                            <Redirect to='r/home/' />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/home/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'1'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/popular/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'2'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/r/all/' 
                                        render={() => 
                                            <Handler setActiveTab={context.toggleTab} activeTab={'3'} />
                                        }
                                    />
                                    <Route 
                                        exact 
                                        path='/u/:username/' 
                                        render={(props) => {
                                            return (
                                                <React.Fragment>
                                                    <Handler setActiveTab={context.toggleTab} activeTab={'4'} />
                                                    <ProfileComponent username={props.match.params.username} />
                                                </React.Fragment>
                                            )
                                        }}
                                    />
                                </React.Fragment>
                            </BrowserRouter>
                        </Container>
                    )
                }}
            </Context.Consumer>
        )
    }
}