import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import  Item  from "../Entities/Item"

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
    storage: app.storage.Storage;
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    createUserWithEmailAndPsw = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);
    signInUserWithEmailAndPsw = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);
    signOut = () => this.auth.signOut();
    resetPsw = (email: string) => this.auth.sendPasswordResetEmail(email);
    updatePsw = (password: string) => { if (this.auth.currentUser) this.auth.currentUser.updatePassword(password); }
    getEmail = () => { if (this.auth.currentUser) return this.auth.currentUser.email; }
    user = (uid: string) => this.db.collection('users').doc(uid);
    users = () => this.db.collection('users');
    getItem = (itemId: string) => {
        return new Promise<Item>((resolve) => {
            this.db.collection('items').doc(itemId).get().then(function (doc) {
                if (!doc.exists) {
                    console.log("No such document!");
                    return;
                }
                let item: Item = { id: itemId, name: "NA", description: "NA" };
                console.log("Document data:", doc.data());
                let itemData = doc.data() ? doc.data() : null;
                if (itemData) {
                    item.id = itemId;
                    item.name = itemData.name;
                    item.description = itemData.description;
                }
                resolve(item);
            }).catch(function (error) {
                console.log("Error getting document:", error);
            })
        })

    };

    getItems = () => this.db.collection('items');
    getUserItems = () => this.db.collection('items').where("email", "==", (this.auth.currentUser ? this.auth.currentUser.email : "n/a"));
    setItem = (item: Item) => {
        return this.db.collection('items')
            .doc(item.id ? item.id : Math.random().toString(36).substring(7))
            .set({
                ...item,
                email: (this.auth.currentUser ? this.auth.currentUser.email : null)
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                throw error;
            });
    };

    deleteItem = (itemId: string) => {
        this.db.collection("items").doc(itemId).delete().then(function () {
            console.log(`Document: ${itemId} successfully deleted!`);
        }).catch(function (error) {
            console.error(`Error removing document ${itemId} : `, error);
        });
    }

    getItemImg = () => {
        return new Promise<string>((resolve) => {
            let ref = this.storage.ref('ItemImages/use_case_naudos_01.jpg');
            ref.getDownloadURL().then(url => {
                console.log(url);
                resolve(url);
            })
        });
    }
}


export default Firebase;