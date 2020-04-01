import { UserItemsDocument, ItemModel, ItemPreview } from '../Entities/Interfaces';

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
