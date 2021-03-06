import { UserItemsDocument, ItemModel, ItemPreview, GroupModel, User, GroupModelSend, SharegResponse, Message, CreateSharegRequest } from '../Entities/Interfaces';
import { GroupDTO } from './DTOs';

export const toUserItems = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();

        const userItems: UserItemsDocument = {
            userOwnedItemList: docData!.owned_items || [],
            userLentItemList:  docData!.lent_items || [],
            userBorrowedItemList: docData!.borrowed_items || [],
            groupList: docData!.groups,
        };
        return userItems;
    } catch (e) {
        throw new Error(e);
    }
};

export const toItem = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const item: ItemModel = {
            id: doc.id,
            name: docData!.name,
            owner: docData!.owner,
            description: docData!.description || '',
            images: docData!.images,
            borrowed: docData!.borrowed,
            borrowed_date: docData!.borrowed_date || [],
            groups: docData!.groups,
        };
        return item;
    } catch (e) {
        throw new Error(e);
    }
};

export const toItemPreview = (doc: firebase.firestore.DocumentSnapshot): ItemPreview => {
    try {
        const docData = doc.data();
        const item: ItemPreview = {
            id: doc.id,
            name: docData!.name,
            image_url: docData!.images[0],
        };
        return item;
    } catch (e) {
        throw new Error(e);
    }

};

export const toGroup = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const group: GroupModel = {
            id: docData!.id,
            name: docData!.name,
            description: docData!.description,
            admins: docData!.admins,
            members: docData!.members,
        };
        return group;
    } catch (e) {
        throw new Error(e);
    }
};

export const toGroupDTO = (docId: string, admin: User, members: User[], groupDetails: GroupModelSend) => {
    const newGroup: GroupDTO = {
        id: docId!,
        admins: [admin],
        name: groupDetails.name!,
        description: groupDetails.description ? groupDetails.description : 'No description',
        members,
    };

    return newGroup;
};

export const toUser = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const user: User = {
            id: docData!.id,
            name: docData!.username,
        };
        return user;
    } catch (e) {
        throw new Error(e);
    }
};

export const toSharegreementDTO = (
        id: string,
        status: number,
        borrower: User,
        owner: User,
        shareg: CreateSharegRequest,
    ): SharegResponse => {

    return {
        id,
        itemId: shareg.itemId!,
        itemName: shareg.itemName!,
        itemImg: shareg.itemImg,
        owner,
        ownerId: owner.id,
        borrower,
        borrowerId: borrower.id,
        startDate: shareg.startDate,
        endDate: shareg.endDate,
        status,
    };
};

export const toSharegreement = (userId: string, doc: firebase.firestore.DocumentSnapshot): SharegResponse => {
    const docData = doc.data();

    return {
        id: docData!.id,
        itemId: docData!.itemId!,
        itemName: docData!.itemName!,
        itemImg: docData!.itemImg ? docData!.itemImg : 'No Image',
        owner: docData!.owner,
        borrower: docData!.borrower,
        startDate: docData!.startDate,
        endDate: docData!.endDate,
        status: docData!.status,
        role: docData!.ownerId === userId ? 'owner' : 'borrower',
    };
};

export const toMessageList = (
    userId: string,
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>)
    : Message[] => {
    return snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
            id: doc.id,
            author: docData.author,
            text: docData.text,
            date: docData.date,
            type: docData.type,
            position: docData.author === userId ? 'right' : 'left',
        };
    });
};

export const toMessageDTO = (userId: string, docId: string, text: string): Message => {
    return {
        id: docId,
        author: userId,
        text,
        date: new Date(),
        type: 'text',
    };
};
