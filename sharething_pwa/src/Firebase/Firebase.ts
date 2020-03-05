import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { ItemModel, ConversationInfo, docToConvo, UserItemsDocument } from '../Entities/Interfaces';
import * as NAME from '../Constants/Names';
import { itemMapper, userItemsMapper } from './Mappers';

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
// TODO: User has to have email(PRIVATE), userID(auth.uid)(PUBLIC) and name(auth.dispalyName).
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

    public getUserItemsDocument = (listener: any) => {
        try {
            const docRef = this.db.collection(NAME.USER_ITEMS).doc(this.auth.currentUser?.uid);

            return docRef.onSnapshot((doc) => {
                const userList: UserItemsDocument = userItemsMapper(doc);

                listener(userList);
            });
        } catch (e) {
            throw new Error(e);
        }

    };

    public createUserWithEmailAndPsw = (email: string, password: string) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };
    public signInUserWithEmailAndPsw = (email: string, password: string) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };
    public signOut = () => this.auth.signOut();
    public resetPsw = (email: string) => this.auth.sendPasswordResetEmail(email);
    public updatePsw = (password: string) => {
        if (this.auth.currentUser) { this.auth.currentUser.updatePassword(password); } };
    public getUserId = () => { if (this.auth.currentUser) { return this.auth.currentUser.uid; } };
    public userRef = (uid: string) => this.db.collection(NAME.USERS_COLLECTION).doc(uid);

    public async fetchSingleItem(id: string): Promise<ItemModel> {
        try {
            const docRef = this.db.collection(NAME.ITEMS_COLLECTION).doc(id);
            const doc = await docRef.get();

            return itemMapper(doc);
        } catch (e) {
            throw new Error(e);
        }
    }

    public getItems = () => this.db.collection(NAME.ITEMS_COLLECTION);

    public getUserItems = () => {
        return this.db.collection(NAME.ITEMS_COLLECTION).where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public createNewConversation = (item: ItemModel) => {
        return new Promise<string>((resolve) => {this.db.collection(NAME.CONVERSATION_COLLECTION)
            .add({
                itemId: item.id,
                itemImg: item.images[0],
                itemName: item.name,
                ownerId: item.owner,
                seekerId: this.getUserId(),
            })
            .then((ref: app.firestore.DocumentReference) => {
                ref.collection(NAME.MESSAGE_COLLECTION).add({}).then(() => {
                    resolve(ref.id);
                },
                );
                console.log('Conversation successfully created!');
            })
            .catch(function(error) {
                console.error('Error writing document: ', error);
                throw error;
            }); });
    };

    public getAsOwnerConversations = () => {
        return this.db.collection(NAME.CONVERSATION_COLLECTION)
        .where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public getAsSeekerConversations = () => {
        return this.db.collection(NAME.CONVERSATION_COLLECTION)
        .where('seekerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public getConvo = (convoId: string) => {
        return new Promise<Conversation>((resolve) => {
            this.db.collection(NAME.CONVERSATION_COLLECTION).doc(convoId).get().then(doc => {
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
            author: this!.auth!.currentUser!.uid,
            text: messageText,
            time: new Date(),
        });
    };

    // public saveItem = (item: Item, image: File) => {
    //     // TODO firebase default seqeunce as ID
    //     item.id = item.id ? item.id : Math.random().toString(36).substring(7);

    //     return this.saveImageToStorage(image, item.id)
    //     .then(url => {
    //         item.imageUrl = url;
    //         return this.saveItemToFirestore(item); },
    //     );
    // };

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

    // public saveItemToFirestore = (item: Item) => {
    //     return this.db.collection(NAME.ITEMS_COLLECTION)
    //         .doc(item.id)
    //         .set({
    //             ...item,
    //             ownerId: (this.auth.currentUser ? this.auth.currentUser.uid : null),
    //         })
    //         .then(function() {
    //             console.log('Document successfully written!');
    //         })
    //         .catch(function(error) {
    //             console.error('Error writing document: ', error);
    //             throw error;
    //         });
    // };

    // public deleteItem = (itemId: string) => {
    //     this.db.collection(NAME.ITEMS_COLLECTION).doc(itemId).delete().then().catch((error) => {
    //         console.error(`Error removing document ${itemId} : `, error);
    //     });
    //     const ref = this.storage.ref(`ItemImages/${itemId}`);

    //     ref.delete().then().catch((error) => {
    //         console.log('Error when deleting Image');
    //     });
    // };

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
