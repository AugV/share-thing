import React from 'react';
import Firebase from './Firebase';
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export const withFirebaseProvider = Component => props => (
    <FirebaseContext.Provider value = {new Firebase()}>
       <Component />
    </FirebaseContext.Provider>
)

export default FirebaseContext;