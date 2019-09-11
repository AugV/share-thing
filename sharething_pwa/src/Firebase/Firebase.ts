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
    auth: app.auth.Auth;
    db: app.firestore.Firestore;
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    createUserWithEmailAndPsw = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);
    signInUserWithEmailAndPsw = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);
    signOut = () => this.auth.signOut();
    resetPsw = (email: string) => this.auth.sendPasswordResetEmail(email);
    updatePsw = (password: string) => { if (this.auth.currentUser) this.auth.currentUser.updatePassword(password); }
    getEmail = () => { if (this.auth.currentUser) return this.auth.currentUser.email; }
    user = (uid: string) => this.db.collection('users').doc(uid);
    users = () => this.db.collection('users');

    getItems = () => this.db.collection('items');
    pushItem = (name: string, description: string, ) => {
        this.db.collection('items')
            .doc(Math.random().toString())
            .set({
                name: name,
                description: description,
                email: (this.auth.currentUser ? this.auth.currentUser.email:null)
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
}


export default Firebase;