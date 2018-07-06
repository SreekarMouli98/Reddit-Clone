import React, {Component} from 'react'
import Context from '../provider'
import SwitchTab from './OtherComponents/SwitchTab'
import { BrowserRouter, Route, Redirect } from "react-router-dom";

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
                        <React.Fragment>
                            <BrowserRouter>
                                <React.Fragment>
                                    <Route exact path='/' render={() => <Redirect to='/home/' /> } />
                                    <Route exact path='/home/' render={() => <Handler setActiveTab={context.toggleTab} activeTab={'1'} />}/>
                                    <Route exact path='/popular/' render={() => <Handler setActiveTab={context.toggleTab} activeTab={'2'} />}/>
                                    <Route exact path='/all/' render={() => <Handler setActiveTab={context.toggleTab} activeTab={'3'} />}/>
                                </React.Fragment>
                            </BrowserRouter>
                            <SwitchTab />
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}