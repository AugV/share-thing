import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Item, ConversationInfo, docToConvo } from '../Entities/Interfaces';
import * as NAME from '../Constants/Names';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

interface Conversation {
    conversationInfo: ConversationInfo;
    messagesRef: app.firestore.CollectionReference;
}

class Firebase {
    public auth: app.auth.Auth;
    public db: app.firestore.Firestore;
    public storage: app.storage.Storage;
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    public createUserWithEmailAndPsw = (email: string, password: string) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };
    public signInUserWithEmailAndPsw = (email: string, password: string) => {
<<<<<<< HEAD
        return this.auth.signInWithEmailAndPassword(email, password)
=======
        return this.auth.signInWithEmailAndPassword(email, password);
>>>>>>> 179e7ddffe49a8270a1235f1fe81ed23f1012c19
    };
    public signOut = () => this.auth.signOut();
    public resetPsw = (email: string) => this.auth.sendPasswordResetEmail(email);
    public updatePsw = (password: string) => {
        if (this.auth.currentUser) { this.auth.currentUser.updatePassword(password); } };
    public getEmail = () => { if (this.auth.currentUser) { return this.auth.currentUser.email; } };
    public user = (uid: string) => this.db.collection('users').doc(uid);
    public users = () => this.db.collection('users');
    public getItem = (itemId: string) => {
        return new Promise<Item>((resolve) => {
            this.db.collection('items').doc(itemId).get().then(function(doc) {
                if (!doc.exists) {
                    console.log('No such document!');
                    return;
                }
                const item: Item = { id: itemId, name: 'NA', description: 'NA' };

                const itemData = doc.data() ? doc.data() : null;

                if (itemData) {
                    item.id = itemId;
                    item.name = itemData.name;
                    item.description = itemData.description;
                    item.imageUrl = itemData.imageUrl;
                }
                resolve(item);
            }).catch(error => {
                console.log('Error getting document:', error);
            });
        });

    };

    public getItems = () => this.db.collection('items');

    public getUserItems = () => {
        return this.db.collection('items').where('email', '==', (this.auth.currentUser ? this.auth.currentUser.email : 'n/a'));
    };

    public getAsOwnerConversations = () => {
        return this.db.collection('chat')
        .where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.email : 'n/a'));
    };

    public getAsSeekerConversations = () => {
        return this.db.collection('chat')
        .where('seekerId', '==', (this.auth.currentUser ? this.auth.currentUser.email : 'n/a'));
    };

    public getConvo = (convoId: string) => {
        return new Promise<Conversation>((resolve) => {
            this.db.collection('chat').doc(convoId).get().then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    return;
                }

                const conversation: Conversation = {
                    conversationInfo: docToConvo(doc),
                    messagesRef: doc.ref.collection(NAME.MESSAGE_COLLECTION),
                };

                resolve(conversation);
            }).catch(error => {
                console.log('Error getting document:', error);
            });
        },
            );
    };

    public sendMessage = (messageText: string, ref: firebase.firestore.CollectionReference) => {
        ref.add({
            author: this!.auth!.currentUser!.email,
            text: messageText,
            // time: app.firestore.FieldValue.serverTimestamp(),
            time: new Date(),
        });
    };

    public saveItem = (item: Item, image: File) => {
        item.id = item.id ? item.id : Math.random().toString(36).substring(7);

        return this.saveImageToStorage(image, item.id)
        .then(url => {
            item.imageUrl = url;
            return this.saveItemToFirestore(item); },
        );
    };

    public saveImageToStorage = (file: File, fileName: string) => {
        return new Promise<string>((resolve) => {
            const upload = this.storage.ref('ItemImages/' + fileName).put(file);

            upload.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
            }, (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL);
                });
            });

        });
    };

    public saveItemToFirestore = (item: Item) => {
        return this.db.collection('items')
            .doc(item.id)
            .set({
                ...item,
                email: (this.auth.currentUser ? this.auth.currentUser.email : null),
            })
            .then(function() {
                console.log('Document successfully written!');
            })
            .catch(function(error) {
                console.error('Error writing document: ', error);
                throw error;
            });
    };

    public deleteItem = (itemId: string) => {
        this.db.collection('items').doc(itemId).delete().then(function() {
        }).catch(function(error) {
            console.error(`Error removing document ${itemId} : `, error);
        });
        const ref = this.storage.ref(`ItemImages/${itemId}`);

        ref.delete().then(() => {
        }).catch((error) => {
            console.log('Error when deleting Image');
        });
    };

    public getItemImg = () => {
        return new Promise<string>((resolve) => {
            const ref = this.storage.ref('ItemImages/use_case_naudos_01.jpg');

            ref.getDownloadURL().then(url => {
                resolve(url);
            });
        });
    };

}

export default Firebase;
