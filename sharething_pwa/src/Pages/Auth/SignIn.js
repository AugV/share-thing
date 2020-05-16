import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { SignUpLink } from './SignUp';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../Constants/Routes';
import { PasswordResetLink } from "./PasswordReset";
import { withTranslation, useTranslation } from 'react-i18next';

import { Button } from 'antd';

const SignInScreen = () => {
  const { t, i18n } = useTranslation();

  return ( 
    <div style={{padding: '10px'}}>
      <h1>{t('signIn')}</h1>
      <SignInForm />
      <SignUpLink />
      <PasswordResetLink />
    </div>
  )
};

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
        this.props.history.push(ROUTES.MY_ITEMS);
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

    const isInvalid = password === '' || email === '';

    return (
      <div >
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>{this.props.t('emailAddress')}</Form.Label>
            <Form.Control name="email" type="email" placeholder={this.props.t('enterEmail')} onChange={this.onChange} value={email} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>{this.props.t('password')}</Form.Label>
            <Form.Control name="password" type="password" placeholder={this.props.t('enterPassword')} onChange={this.onChange} value={password} />
          </Form.Group>

          <Button disabled={isInvalid} type="primary" htmlType='submit'>
          {this.props.t('signIn')}
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const SignInForm = withTranslation()(withRouter(withFirebase(SignInFormBase)));

export default SignInScreen;