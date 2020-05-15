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
    SharegResponse,
    SHAREG_STATUS,
    Message,
    CreateSharegRequest,
} from '../Entities/Interfaces';
import * as NAME from '../Constants/Names';
import { toItem, toUserItems, toItemPreview, toGroup, toGroupDTO, toUser, toSharegreementDTO, toSharegreement, toMessageList, toMessageDTO } from './Mappers';
import { UserItemsDocDTO, ItemPreviewDTO, GroupDTO } from './DTOs';
import { ImagePack, DateRange } from '../Entities/Types';

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

    public async createSharegreement(sharegreement: CreateSharegRequest): Promise<string> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc();
        const userId = this.auth.currentUser?.uid;

        const borrower: User = {
            id: userId!,
            name: await this.getUserName(userId!),
        };

        const owner: User = {
            id: sharegreement.owner,
            name: await this.getUserName(sharegreement.owner),
        };

        const newShareg = toSharegreementDTO(
            docRef.id,
            SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM,
            borrower,
            owner,
            sharegreement,
            );

        return docRef.set(newShareg).then(() => Promise.resolve(docRef.id));
    }

    public getSingleSharegreement(id: string, listener: (shareg: SharegResponse) => void): () => void {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);
        const userId = this.auth.currentUser?.uid;

        return docRef.onSnapshot(doc => {
            listener(toSharegreement(userId!, doc));
        });
    }

    public addItemToBorrowedItems(sharegreement: SharegResponse): Promise<void> {
        const userId = this.auth.currentUser?.uid;
        const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

        return docRef.update({ borrowed_items: app.firestore.FieldValue.arrayUnion({
            id: sharegreement.id,
            name: sharegreement.itemName,
            image_url: sharegreement.itemImg,
            end_date: sharegreement.endDate,
        }),
        });
    }

    public addItemToLentItems(sharegreement: SharegResponse): Promise<void> {
        const userId = this.auth.currentUser?.uid;
        const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

        return docRef.update({ lent_items: app.firestore.FieldValue.arrayUnion({
            id: sharegreement.id,
            name: sharegreement.itemName,
            image_url: sharegreement.itemImg,
            end_date: sharegreement.endDate,
        }),
        });
    }

    public async borrowerItemReturned(sharegreement: SharegResponse): Promise<void> {
        const userId = this.auth.currentUser?.uid;
        const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

        const userItemDoc = await docRef.get();
        const userItems: ItemPreviewDTO[] = userItemDoc.data()!.borrowed_items;
        const newUserItems = userItems.filter(item => item.id !== sharegreement.id);

        return docRef.update({ borrowed_items: newUserItems });
    }

    public async ownerItemReturned(sharegreement: SharegResponse): Promise<void> {
        const userId = this.auth.currentUser?.uid;
        const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

        const userItemDoc = await docRef.get();
        const userItems: ItemPreviewDTO[] = userItemDoc.data()!.lent_items;
        const newUserItems = userItems.filter(item => item.id !== sharegreement.id);

        return docRef.update({ lent_items: newUserItems });
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

        const userId = this.auth.currentUser?.uid;

        const items = queryResult.docs
            .filter(doc => doc.data().owner !== userId)
            .map((doc) => toItemPreview(doc));

        return items;
    };

    public getUserItemsDocument = (listener: (userItems: UserItemsDocument) => void) => {
        try {
            const userId = this.auth.currentUser?.uid;
            const docRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

            return docRef.onSnapshot((doc) => {
                const userList: UserItemsDocument = toUserItems(doc);

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

    public initializeNewUser = (username: string): Promise<void> => {
        const userId = this.auth.currentUser?.uid;
        const batch = this.db.batch();

        const userRef = this.db.collection(NAME.USERS).doc(userId);

        batch.set(userRef, { id: userId, username });

        const userItemsRef = this.db.collection(NAME.USER_ITEMS).doc(userId);

        batch.set(userItemsRef, { });

        const userGroupsRef = this.db.collection(NAME.USER_GROUPS).doc(userId);

        batch.set(userGroupsRef, { });

        return batch.commit();
    };

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

        const members = [];

        if (group.members) {
            await Promise.all(group.members.map(async memberId => {
                members.push({
                    id: memberId,
                    name: await this.getUserName(memberId),
                });
            }),
            );
        }

        members.push(admin);

        const newGroup: GroupDTO = toGroupDTO(docRef.id, admin, members, group);

        this.updateUserGroups(docRef.id, members);

        docRef.set(newGroup);
    }

    public async updateGroup(group: Partial<GroupModelSend>): Promise<void> {
        const docRef = this.db.collection(NAME.GROUPS).doc(group.id);
        const newMembers: {id: string, name: string}[] = [];

        if (group.members) {
            await Promise.all(group.members.map(async memberId => {
                newMembers.push({
                    id: memberId,
                    name: await this.getUserName(memberId),
                });
            }),
            );
        }

        return docRef.update({ members: app.firestore.FieldValue.arrayUnion(newMembers) });
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

    public async deleteItem(id: string): Promise<void> {
        const itemRef = this.db.collection(NAME.ITEMS).doc(id);

        const itemIsBorrowed: boolean = (await itemRef.get()).data()!.borrowed;

        if (itemIsBorrowed) {
            return Promise.resolve();
        }

        const batch = this.db.batch();

        batch.delete(itemRef);

        const userId = this.auth.currentUser?.uid;
        const userItemRef = this.db.collection(NAME.USER_ITEMS).doc(userId);
        const userItemDoc = await userItemRef.get();
        const userItems: ItemPreviewDTO[] = userItemDoc.data()!.owned_items;
        const newUserItems = userItems.filter(item => item.id !== id);

        batch.update(userItemRef, { owned_items: newUserItems });
        await batch.commit();

        (await this.storage.ref(`${NAME.IMAGE_STORAGE_BASE_PATH}/${id}`)
            .listAll()).items.forEach(item => item.delete());

        return Promise.resolve();
    }

    public getOwnerSharegreements = () => {
        const userId = this.auth.currentUser?.uid;

        return this.db.collection(NAME.SHAREGREEMENTS)
        .where('ownerId', '==', userId).get()
        .then(querySnaphot => {
            return querySnaphot.docs.map(doc => toSharegreement(userId!, doc));
        });
    };

    public getBorrowerSharegreements = () => {
        const userId = this.auth.currentUser?.uid;

        return this.db.collection(NAME.SHAREGREEMENTS)
        .where('borrowerId', '==', userId).get()
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

            if (!userGroupIdsDoc.data() || !userGroupIdsDoc.data()!.groups) {
                return [];
            }
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

    public abortSharegreement(id: string): Promise<void> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);

        return docRef.update({ status: SHAREG_STATUS.ABORTED });
    }

    public advanceSharegStatus(id: string, currentStatus: SHAREG_STATUS): Promise<void> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);

        if (currentStatus === SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM) {
            return docRef.update({ status: currentStatus + 2 });
        } else {
            return docRef.update({ status: currentStatus + 1 });
        }
    }

    public declineSharegreement(id: string): Promise<void> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);

        return docRef.update({ status: SHAREG_STATUS.DECLINED });
    }

    public setSharegNewDates(id: string, role: string, dates: DateRange): Promise<void> {
        const docRef = this.db.collection(NAME.SHAREGREEMENTS).doc(id);

        if (role === 'owner') {
            return docRef.update({
                status: SHAREG_STATUS.PENDING_BORROWER_DATE_CONFIRM,
                startDate: dates[0],
                endDate: dates[1],
            });
        } else {
            return docRef.update({
                status: SHAREG_STATUS.PENDING_OWNER_DATE_CONFIRM,
                startDate: dates[0],
                endDate: dates[1],
            });
        }

    }

    // TODO: not a void
    private updateUserGroups(groupId: string, users: User[]): void {
        const ref = this.db.collection(NAME.USER_GROUPS);

        users.forEach(user => {
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
        const rootImageRef = this.storage.ref(`${NAME.IMAGE_STORAGE_BASE_PATH}/${id}`);

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
        const rootImageRef = this.storage.ref(`${NAME.IMAGE_STORAGE_BASE_PATH}/${id}`);

        const st = await rootImageRef.listAll().then((res) => {
            return Promise.all(res.items.map(item => {
                return item.getDownloadURL().then(url => url);
            }));
        });

        return st;
    };
}

export default Firebase;
