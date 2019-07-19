import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../Constants/Routes';

const PasswordResetScreen = () => (
  <div>
    <h1>Reset Password</h1>
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
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordResetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_RESET}>Forgot Password?</Link>
  </p>
);

export default PasswordResetScreen;

const PasswordResetForm = withFirebase(PasswordResetFormBase);

export { PasswordResetForm , PasswordResetLink };