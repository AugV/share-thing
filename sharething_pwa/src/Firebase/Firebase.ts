import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { ItemModel, ConversationInfo, docToConvo, UserItemsDocument, GroupNameAndId, ItemModelSend, ItemPreview, ItemQuery } from '../Entities/Interfaces';
import * as NAME from '../Constants/Names';
import { toItem, userItemsMapper, toItemPreview } from './Mappers';
import { UserItemsDocDTO, ItemPreviewDTO, ItemQueryResult } from './DTOs';
import { ImagePack } from '../Entities/Types';

type Query<T = app.firestore.DocumentData> = app.firestore.Query;
type DocumentData = app.firestore.DocumentData;

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

    public queryItems = async (query: ItemQuery) => {
        const itemCollection = this.db.collection(NAME.ITEMS).limit(5);

        const dbQuery = function nameQuery(nameFilter: Query<DocumentData>)
        : Query<DocumentData> {

            if (query.name) {
                return function groupQuery(groupFilter: Query<DocumentData>)
                : Query<DocumentData> {
                    if (query.groups) {
                        return groupFilter.where('groups', 'array-contains-any', query.groups);
                    }
                    return groupFilter;
                }(nameFilter.where('name', '==', query.name));
            }

            return function groupQuery(groupFilter: Query<DocumentData>)
            : Query<DocumentData> {
                if (query.groups && query.groups.length) {
                    return groupFilter.where('groups', 'array-contains-any', query.groups);
                }
                return groupFilter;
            }(nameFilter);

        }(itemCollection);

        const queryResult = await dbQuery.get();

        const items = queryResult.docs.map((doc) => {
            return toItemPreview(doc);
        });

        return items;
    };

    public getUserItemsDocument = (listener: any) => {
        try {
            const userId = this.auth.currentUser?.uid;
            const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

            return docRef.onSnapshot((doc) => {
                const userList: UserItemsDocument = userItemsMapper(doc);

                listener(userList);
            });
        } catch (e) {
            throw new Error(e);
        }

    };

    public saveItem = (item: ItemModelSend) => {
        if (item.id) {
            return this.updateItem(item);
        } else {
            return this.createItem(item);
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
    public userRef = (uid: string) => this.db.collection(NAME.USERS).doc(uid);

    public async fetchSingleItem(id: string): Promise<ItemModel> {
        try {
            const docRef = this.db.collection(NAME.ITEMS).doc(id);
            const doc = await docRef.get();

            return toItem(doc);
        } catch (e) {
            throw new Error(e);
        }
    }

    public getItems = () => this.db.collection(NAME.ITEMS);

    public getUserItems = () => {
        return this.db.collection(NAME.ITEMS).where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public createNewConversation = (item: ItemModel) => {
        return new Promise<string>((resolve) => {this.db.collection(NAME.CONVERSATIONS)
            .add({
                itemId: item.id,
                itemImg: item.images[0],
                itemName: item.name,
                ownerId: item.owner,
                seekerId: this.getUserId(),
            })
            .then((ref: app.firestore.DocumentReference) => {
                ref.collection(NAME.MESSAGES).add({}).then(() => {
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
        return this.db.collection(NAME.CONVERSATIONS)
        .where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public getAsSeekerConversations = () => {
        return this.db.collection(NAME.CONVERSATIONS)
        .where('seekerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public getConvo = (convoId: string) => {
        return new Promise<Conversation>((resolve) => {
            this.db.collection(NAME.CONVERSATIONS).doc(convoId).get().then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    return;
                }

                const conversation: Conversation = {
                    conversationInfo: docToConvo(doc),
                    messagesRef: doc.ref.collection(NAME.MESSAGES),
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

    public getUsersGroupNamesAndIds = async () => {
        try {
            const userId = this.auth.currentUser?.uid;
            const userGroupIdsRef = this.db.collection(NAME.USER_GROUPS).doc(userId);
            const userGroupIdsDoc = await userGroupIdsRef.get();
            const userGroupIds = userGroupIdsDoc.data()!.groups;

            const userGroups: GroupNameAndId[] = [];

            if (userGroupIds.length > 0) {
                const groupsRef = this.db.collection(NAME.GROUPS).where('id', 'in', userGroupIds);

                await groupsRef.get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        userGroups.push({ id: doc.data().id, name: doc.data().name });
                    });
                });

            }
            return userGroups;
        } catch (e) {
            throw new Error(e);
        }
    };

    private updateItem = async (item: ItemModelSend) => {
        const itemDocRef = this.db.collection(NAME.ITEMS).doc(item.id);

        if (!await itemDocRef.get()) {
            throw new Error('Item does not exist');
        }

        await this.uploadImages(item.id!, item.images);

        const newImagePreview: string[] = await this.getImageUrls(item.id!);

        const userItemRef = this.db.collection(NAME.USER_ITEMS).doc(this.auth.currentUser!.uid);
        const userItemDoc: UserItemsDocDTO = await (await userItemRef.get()).data() as UserItemsDocDTO;

        const ownedItemsUpdated = userItemDoc.owned_items.map((value) => {
            if (value.id === item.id) {
                return { ...value, name: item.name, image_url: newImagePreview[0] };
            } else {
                return value;
            }
        });

        const batch = this.db.batch();

        return batch.update(itemDocRef, { ...item, images: newImagePreview })
        .update(userItemRef, { owned_items: ownedItemsUpdated })
        .commit();
    };

    private createItem = async (item: ItemModelSend) => {
        const itemDocRef = this.db.collection(NAME.ITEMS).doc();

        await this.uploadImages(itemDocRef.id, item.images);
        const newImagePreview: string[] = await this.getImageUrls(itemDocRef.id);

        await itemDocRef.set({
            ...item,
            id: itemDocRef.id,
            images: newImagePreview,
        });

        const userItemRef = this.db.collection(NAME.USER_ITEMS).doc(this.auth.currentUser!.uid);
        const itemPreview: ItemPreviewDTO = {
            id: itemDocRef.id,
            name: item.name,
            image_url: newImagePreview[0],
        };

        return userItemRef.update({ owned_items: app.firestore.FieldValue.arrayUnion({ ...itemPreview }) });

    };

    private uploadImages = async (id: string, images: ImagePack) => {
        const rootImageRef = this.storage.ref(`${NAME.IMAGE_STORAGE_BASE_PATH}${id}/`);

        return Promise.all(images.map((image, index) => {
            const imageRef = rootImageRef.child(index.toString());

            if (image) {
                return imageRef.put(image);
            } else if (image === null) {
                return imageRef.delete();
            }
        }));
    };

    private getImageUrls = async (id: string) => {
        const rootImageRef = this.storage.ref(`${NAME.IMAGE_STORAGE_BASE_PATH}${id}/`);

        const st = await rootImageRef.listAll().then((res) => {
            return Promise.all(res.items.map(item => {
                return item.getDownloadURL().then(url => url);
            }));
        });

        return st;
    };

}

export default Firebase;
