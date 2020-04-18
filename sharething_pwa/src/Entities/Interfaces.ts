import { ImagePack, NameQueryParam, GroupsQueryParam } from './Types';

export interface ItemQuery {
    name: NameQueryParam;
    groups: GroupsQueryParam;
}

interface StartEndDate {
    start: Date;
    end: Date;
}

export interface ListItem {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
}

export interface ItemModel {
    id: string;
    name: string;
    owner: string;
    description?: string;
    images: string[];
    borrowed: false;
    borrowed_date?: StartEndDate[];
    groups: string[];
}

export interface SharegreementModel {
    id: string;
    itemId: string;
    itemName: string;
    owner: string;
    startDate: string;
    endDate: string;
    borrower: string;
    status: SHAREG_STATUS;
}

export enum SHAREG_STATUS {
    PENDING_OWNER_DATE_CONFIRM,
    PENDING_BORROWER_DATE_CONFIRM,
    DATES_CONFIRMED,
    BORROWER_ITEM_DISPATCHED,
    OWNER_ITEM_DISPATCHED,
    WAITING_FOR,
    OWNER_ITEM_RETURNED,
    BORROWER_ITEM_RETURNED,
}

export interface ItemModelSend {
    id?: string;
    name: string;
    description?: string;
    images: ImagePack;
    borrowed?: false;
    borrowed_date?: StartEndDate[];
    groups: string[];
}

export interface ConversationInfo {
    id: string;
    itemId: string;
    itemImg: string;
    itemName: string;
    ownerId: string;
    seekerId: string;
}

export interface Message {
    id: string;
    position: string;
    type: string;
    text: string;
    date: Date;
}

export interface ItemPreview {
    id: string;
    name: string;
    image_url: string;
    end_date?: Date;
}

export interface GroupNameAndId {
    id: string;
    name: string;
}

export interface UserItemsDocument {
    userOwnedItemList: ItemPreview[];
    userLentItemList: ItemPreview[];
    userBorrowedItemList: ItemPreview[];
    groupList: string[];
}

export interface GroupModel {
    id: string;
    name: string;
    description: string;
    admins: User[];
    members: User[];
}

export interface GroupModelSend {
    name: string;
    description: string | undefined;
    members: string[];
}

export function docToConvo(document: firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot): ConversationInfo {
    const convo: ConversationInfo = {
        id: document.id,
        itemId: document.data()!.itemId,
        itemImg: document.data()!.itemImg,
        itemName: document.data()!.itemName,
        ownerId: document.data()!.ownerId,
        seekerId: document.data()!.seekerId,
    };

    return convo;
}

export function docToMessage(document: firebase.firestore.QueryDocumentSnapshot, userId: string): Message {
    const message: Message = {
        id: document.id,
        position: userId === document.data().author ? 'right' : 'left',
        type: 'text',
        text: document.data().text,
        date: document.data().time.toDate(),
    };

    return message;
}
