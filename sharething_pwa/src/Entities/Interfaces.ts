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

export interface SharegResponse {
    id: string;
    itemId: string;
    itemName: string;
    itemImg?: string;
    owner: User;
    startDate: string;
    endDate: string;
    borrower: User;
    status: SHAREG_STATUS;
    role?: string;
}

export interface CreateSharegRequest {
    itemId: string;
    itemName: string;
    itemImg: string;
    owner: string;
    startDate: string;
    endDate: string;
}

export enum SHAREG_STATUS {
    DECLINED,
    ABORTED,
    PENDING_OWNER_DATE_CONFIRM,
    PENDING_BORROWER_DATE_CONFIRM,
    DATES_CONFIRMED,
    OWNER_ITEM_DISPATCHED,
    BORROWER_ITEM_DISPATCHED,
    BORROWER_ITEM_RETURNED,
    FINISHED,
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

export interface Message {
    id: string;
    author: string;
    position?: string;
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
    id?: string;
    name: string;
    description: string | undefined;
    members: string[];
}
