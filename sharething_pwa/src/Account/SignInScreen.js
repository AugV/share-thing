import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';

import { SignUpLink } from './SignUpScreen';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../Constants/Routes';
import { PasswordResetLink } from "./PasswordResetScreen";

const SignInScreen = () => (
  <div>
    <h1>Share </h1>
    <SignInForm />
    <SignUpLink />
    <PasswordResetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .signInUserWithEmailAndPsw(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;


    console.log(this.props)
    const isInvalid = password === '' || email === '';

    return (
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.onChange} value={email} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" onChange={this.onChange} value={password} />
          </Form.Group>

          <Button disabled={isInvalid} variant="primary" type="submit">
            Sign-In
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInScreen;