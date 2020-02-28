import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import * as ROUTES from '../../Constants/Routes';

import { withFirebase } from '../../Firebase';

const SignUpScreen = () => (
    <div>
        <h1>Sign-Up</h1>
        <SignUpForm />
    </div>
);

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
                const userId = authUser.user.uid;
                this.props.firebase.userRef(userId).set({ username, userId });
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
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.onChange} value={username} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.onChange} value={email} />
                    </Form.Group>

                    <Form.Group controlId="passwordOne">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="passwordOne" type="password" placeholder="Password" onChange={this.onChange} value={passwordOne} />
                    </Form.Group>

                    <Form.Group controlId="passwordTwo">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="passwordTwo" type="password" placeholder="Confirm Password" onChange={this.onChange} value={passwordTwo} />
                    </Form.Group>

                    <Button disabled={isInvalid} variant="primary" type="submit">
                        Sign-Up
                     </Button>
                    {error && <p>{error.message}</p>}
                </Form>

        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpScreen;

export { SignUpFormBase as SignUpForm, SignUpLink };