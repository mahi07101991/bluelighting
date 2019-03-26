import React, { Component } from 'react';

class Navigation extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
      }

    goTo(route) {
        this.props.history.push(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }
    componentDidMount() {
        const { renewSession } = this.props.auth;
        if (localStorage.getItem('isLoggedIn') === 'true') {
            renewSession();
        }
    }

    render() {
        return (
            <nav class="navbar navbar-default">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                        </ul>
                        <ul class="nav navbar-nav navbar-right">

                            <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-log-in"></span>Logged in as <i>{this.state.profile.name}</i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;