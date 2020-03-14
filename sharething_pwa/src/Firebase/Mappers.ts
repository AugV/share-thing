import { UserItemsDocument, ItemModel } from '../Entities/Interfaces';

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

export const itemMapper = (doc: firebase.firestore.DocumentSnapshot) => {
    try {
        const docData = doc.data();
        const item: ItemModel = {
            id: docData!.id,
            name: docData!.name,
            owner: docData!.owner,
            description: docData!.description || '',
            images: docData!.images,
            borrowed: docData!.borrowed,
            borrowed_date: docData!.borrowed_date || [],
            groups: docData!.group,
        };
        return item;
    } catch (e) {
        throw new Error(e);
    }
};
