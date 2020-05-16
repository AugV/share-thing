import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'antd';
import * as ROUTES from '../../Constants/Routes';
import { withTranslation, useTranslation } from 'react-i18next';

import { withFirebase } from '../../Firebase';

const SignUpScreen = () => {
    const { t, i18n } = useTranslation();

    return(
        <div style={{padding: '10px'}}>
            <h1>{t('signUp')}</h1>
            <SignUpForm />
        </div>
    )
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase.createUserWithEmailAndPsw(email, passwordOne)
            .then(authUser => {
                return this.props.firebase.initializeNewUser(username);
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.MY_ITEMS);
            })
            .catch(error => { this.setState({ error }) });


        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo
            || passwordOne === ''
            || email === ''
            || username === '';

        return (
                <Form onSubmit={this.onSubmit}>
                    
                    <Form.Group controlId="username">
                        <Form.Label>{this.props.t('username')}</Form.Label>
                        <Form.Control name="username" type="text" placeholder={this.props.t('enterUsername')} onChange={this.onChange} value={username} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>{this.props.t('emailAddress')}</Form.Label>
                        <Form.Control name="email" type="email" placeholder={this.props.t('enterEmail')} onChange={this.onChange} value={email} />
                    </Form.Group>

                    <Form.Group controlId="passwordOne">
                        <Form.Label>{this.props.t('password')}</Form.Label>
                        <Form.Control name="passwordOne" type="password" placeholder={this.props.t('enterPassword')} onChange={this.onChange} value={passwordOne} />
                    </Form.Group>

                    <Form.Group controlId="passwordTwo">
                        <Form.Label>{this.props.t('repeatPassword')}</Form.Label>
                        <Form.Control name="passwordTwo" type="password" placeholder={this.props.t('repeatPassword')} onChange={this.onChange} value={passwordTwo} />
                    </Form.Group>

                    <Button disabled={isInvalid} type="primary" htmlType='submit'>
                    {this.props.t('signUp')}
                     </Button>
                    {error && <p>{error.message}</p>}
                </Form>

        );
    }
}

const SignUpLink = () => { 
    const { t, i18n } = useTranslation();
    return (
    <p>
        {t('dontHaveAccount')}<Link to={ROUTES.SIGN_UP}>{t('signUp')}</Link>
    </p>
)
};

const SignUpForm = withTranslation()(withRouter(withFirebase(SignUpFormBase)));

export default SignUpScreen;

export { SignUpFormBase as SignUpForm, SignUpLink };