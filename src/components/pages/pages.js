import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Base from '../base/base'
import Account from '../account/account'
import Auth from '../../Auth/Auth';
import Callback from '../../Callback/callback'

class Pages extends Component {
    constructor(props){
        super(props)
        this.auth = new Auth(this.props.history);        
    }

    handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
            this.auth.handleAuthentication();
        }
    }

    render() {
        return (
                <Switch>
                    <Route exact={true} path='/' render={props => <Account auth={this.auth} {...props} />} />
                    <Route path="/dashboard" render={(props) => (
                        this.auth.isAuthenticated() ? (
                            <Base auth={this.auth} {...props} />
                        ) : (
                            <Redirect to="/"/>
                        )
                    )} />
                    <Route path="/callback" render={(props) => { 
                        this.handleAuthentication(props); 
                        return <Callback {...props} /> 
                    }}/> 
                </Switch>
        );
    }
}

export default Pages;