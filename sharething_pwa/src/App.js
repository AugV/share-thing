import React, { Component } from "react";
import "./App.css";

import { Route, BrowserRouter } from "react-router-dom";

import { withFirebaseProvider, withFirebase } from './Firebase';

import LoginScreen from "./Login/LoginScreen";
import SignUpScreen from "./Login/SignUp";
import SignInScreen from "./Login/SignIn";
import HomeScreen from "./Home";
import * as ROUTES from "./Constants/Routes";

import { AuthUserContext } from "./Session";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ?
        this.setState({ authUser }) :
        this.setState({ authUser: null })
    })
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <BrowserRouter>
          <Route exact path={ROUTES.LANDING} component={LoginScreen} />
          <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
          <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
          <Route path={ROUTES.HOME} component={HomeScreen} />
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default withFirebaseProvider(withFirebase(App));
