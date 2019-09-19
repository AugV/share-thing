import React from 'react';
import { Button } from "react-bootstrap";
import { withFirebase } from '../../Firebase';

//TODO: No need for separate component
const SignOutButton = ({ firebase }) => (
    <div style={{float: 'right'}}>
    <Button type="button" onClick={firebase.signOut}>
        Sign Out
    </Button>
    </div>
);

export default withFirebase(SignOutButton);