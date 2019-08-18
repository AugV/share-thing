import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.firestore();
    }
    createUserWithEmailAndPsw = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    signInUserWithEmailAndPsw = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    signOut = () => this.auth.signOut();
    resetPsw = (email) => this.auth.sendPasswordResetEmail(email);
    updatePsw = (password) => this.auth.currentUser.updatePassword(password);
    getEmail = () => this.auth.currentUser.email;

    user = uid => this.db.collection('users').doc(uid);
    users = () => this.db.collection('users');

    items = () => this.db.collection('items');
}


export default Firebase;