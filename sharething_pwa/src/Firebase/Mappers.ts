import { UserItemsDocument, ItemModel, ItemPreview, GroupModel, User, GroupModelSend } from '../Entities/Interfaces';
import { GroupDTO } from './DTOs';

export const userItemsMapper = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const userItems: UserItemsDocument = {
            userOwnedItemList: docData!.owned_items,
            userLentItemList:  docData!.lent_items,
            userBorrowedItemList: docData!.borrowed_items,
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
            admins: [docData!.admins[0]],
            members: docData!.users,
        };
        return group;
    } catch (e) {
        throw new Error(e);
    }
};

export const toGroupDTO = (docId: string, adminId: string, groupDetails: GroupModelSend) => {
    // const newGroup: GroupDTO = {
    //     id: docId!,
    //     admins: [adminId]!,
    //     name: groupDetails.name!,
    //     description: groupDetails.description!,
    //     members: groupDetails.members?.map(member => {
    //         return {
    //             id: member.id,
    //             name: member.name,
    //         };
    //     })!,
    // };

    // return newGroup;
};

export const toUser = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const user: User = {
            id: docData!.userId,
            name: docData!.username,
        };
        return user;
    } catch (e) {
        throw new Error(e);
    }
};
