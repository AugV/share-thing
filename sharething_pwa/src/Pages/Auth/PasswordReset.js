import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'antd';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../Constants/Routes';
import { withTranslation, useTranslation } from 'react-i18next';
import i18n from 'i18next';

const PasswordResetScreen = () => (
  <div>
    <h1>{i18n.t('resetPassword')}</h1>
    <PasswordResetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordResetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .resetPsw(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        
        <Form.Group controlId="email">
          <Form.Control name="email" type="email" placeholder={this.props.t('enterEmail')} onChange={this.onChange} value={this.state.email} />
        </Form.Group>

        <Button disabled={isInvalid} type="primary" htmlType='submit'>
        {this.props.t('reset')}
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordResetLink = () => {
  const { t, i18n } = useTranslation();
  return(
  <p>
    <Link to={ROUTES.PASSWORD_RESET}>{t('forgotPassword')}</Link>
  </p>
);
}

export default PasswordResetScreen;

const PasswordResetForm = withTranslation()(withFirebase(PasswordResetFormBase));

export { PasswordResetForm, PasswordResetLink };