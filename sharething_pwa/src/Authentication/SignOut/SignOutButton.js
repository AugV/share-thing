import React from 'react';
import { Button } from "react-bootstrap";
import { withFirebase } from '../../Firebase';

const SignOutButton = ({ firebase }) => (
    <Button type="button" onClick={firebase.signOut}>
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);