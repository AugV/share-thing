import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'antd';
import { withFirebase } from '../../Firebase';
import i18n from 'i18next';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .updatePsw(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="passwordOne">
          <Form.Control name="passwordOne" type="password" placeholder={i18n.t('enterNewPassword')} onChange={this.onChange} value={passwordOne} />
        </Form.Group>

        <Form.Group controlId="passwordTwo">
          <Form.Control name="passwordTwo" type="password" placeholder={i18n.t('repeatNewPassword')} onChange={this.onChange} value={passwordTwo} />
        </Form.Group>

        <Button disabled={isInvalid} type="primary" htmlType='submit'>
         {i18n.t('change')}
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);