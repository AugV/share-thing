import React, { useEffect } from 'react';
import Firebase, { withFirebase } from '../../Firebase';

interface Props {
    firebase: Firebase;
}

const SignOutComponent: React.FC<Props> = (props) => {
    useEffect(() => {
        props.firebase.signOut();
    }, [props]);

    return(
    <div>
        <div>Good bye</div>
    </div>
    );
};

export const SingOut = withFirebase(SignOutComponent);
