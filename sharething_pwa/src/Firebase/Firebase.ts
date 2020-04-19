import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {
    ItemModel,
    UserItemsDocument,
    GroupNameAndId,
    ItemModelSend,
    ItemQuery,
    GroupModel,
    User,
    GroupModelSend,
    SharegreementModel,
    SHAREG_STATUS,
    Message,
} from '../Entities/Interfaces';
import * as NAME from '../Constants/Names';
import { toItem, userItemsMapper, toItemPreview, toGroup, toGroupDTO, toUser, toSharegreementDTO, toSharegreement, toMessageList, toMessageDTO } from './Mappers';
import { UserItemsDocDTO, ItemPreviewDTO, GroupDTO } from './DTOs';
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

    public createSharegreement(sharegreement: Partial<SharegreementModel>): Promise<string> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc();
        const userId = this.auth.currentUser?.uid;

        const newShareg = toSharegreementDTO(
            docRef.id,
            SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM,
            userId!,
            sharegreement,
            );

        return docRef.set(newShareg).then(() => Promise.resolve(docRef.id));
    }

    public async getSingleSharegreement(id: string): Promise<SharegreementModel> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);
        const userId = this.auth.currentUser?.uid;
        const doc = await docRef.get();

        return toSharegreement(userId!, doc);
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

    public getUserItemsDocument = (listener: (userItems: UserItemsDocument) => void) => {
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
    public getUserId(): string {
        if (this.auth.currentUser) {
            return this.auth.currentUser.uid;
        } else {
            throw new Error('Cannot aquire current user ID');
        }
    }

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

    public async fetchSingleGroup(id: string): Promise<GroupModel> {
        try {
            const docRef = this.db.collection(NAME.GROUPS).doc(id);
            const doc = await docRef.get();

            return toGroup(doc);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async createGroup(group: GroupModelSend): Promise<void> {
        const docRef = this.db.collection(NAME.GROUPS).doc();
        const currentUserId = this.getUserId();
        const admin = {
            id: currentUserId,
            name: await this.getUserName(currentUserId),
        };

        const members = await Promise.all(group.members.map(async memberId => {
            return {
                id: memberId,
                name: await this.getUserName(memberId),
            };
        }),
        );

        members.push(admin);

        const newGroup: GroupDTO = toGroupDTO(docRef.id, admin, members, group);

        this.updateUserGroups(docRef.id, members);

        docRef.set(newGroup);
    }

    public async getUserName(userId: string): Promise<string> {
        const userDoc = await this.db.collection(NAME.USERS).doc(userId).get();

        if (userDoc && userDoc.data()) {
            return userDoc.data()!.username;
        } else {
            return 'Anonymous';
        }
    }

    public getItems = () => this.db.collection(NAME.ITEMS);

    public getUserItems = () => {
        return this.db.collection(NAME.ITEMS).where('ownerId', '==', (this.auth.currentUser ? this.auth.currentUser.uid : 'n/a'));
    };

    public getOwnerSharegreements = () => {
        const userId = this.auth.currentUser?.uid;

        return this.db.collection(NAME.SHAREGREEMENTS)
        .where('owner', '==', userId).get()
        .then(querySnaphot => {
            return querySnaphot.docs.map(doc => toSharegreement(userId!, doc));
        });
    };

    public getBorrowerSharegreements = () => {
        const userId = this.auth.currentUser?.uid;

        return this.db.collection(NAME.SHAREGREEMENTS)
        .where('borrower', '==', userId).get()
        .then(querySnaphot => {
            return querySnaphot.docs.map(doc => toSharegreement(userId!, doc));
        });
    };

    public getChatMessages(id: string, messageListener: (messages: Message[]) => void): () => void {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);
        const userId = this.auth.currentUser?.uid;

        const messages = docRef.collection(NAME.MESSAGES).orderBy('date', 'asc');

        return messages.onSnapshot(snapshot => {
            if (snapshot.empty) {return null; }

            const messageList = toMessageList(userId!, snapshot);

            messageListener(messageList);
        });
    }

    public sendMessage = (id: string, text: string) => {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);
        const userId = this.auth.currentUser?.uid;
        const messageRef = docRef.collection(NAME.MESSAGES).doc();

        const message = toMessageDTO(userId!, messageRef.id, text);

        messageRef.set(message);
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

    public async getAllUsers(): Promise<User[]> {
        const docRef = await this.db.collection(NAME.USERS).get();

        const userList: User[] = docRef.docs.map(doc => {
            return toUser(doc);
        });

        return userList;
    }

    // TODO: not a void
    private updateUserGroups(groupId: string, users: User[]): void {
        const ref = this.db.collection(NAME.USER_GROUPS);

        users.map(user => {
            ref.doc(user.id).update({
                groups: app.firestore.FieldValue.arrayUnion(groupId),
            }).catch(e => console.log(e));
        });
    }

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
            owner: this.auth.currentUser!.uid,
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
