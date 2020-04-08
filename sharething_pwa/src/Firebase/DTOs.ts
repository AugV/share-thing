interface BorrowedItemDTO {
    id: string;
    name: string;
    image_url: string;
    end_date: string;
}

interface LentItemDTO {
    id: string;
    name: string;
    image_url: string;
    end_date: string;
}

interface OwnedItemDTO {
    id: string;
    name: string;
    image_url: string;
}

export interface ItemPreviewDTO {
    id: string;
    name: string;
    image_url: string;
    end_date?: string;
}

export interface UserItemsDocDTO {
    user_name: string;
    owned_items: OwnedItemDTO[];
    lent_items: LentItemDTO[];
    borrowed_items: BorrowedItemDTO[];
}

interface Period {
    start: string;
    end: string;
}

export interface ItemDTO {
    name: string;
    owner: string;
    description?: string;
    images: string[];
    groups: string[];
    borrowed_date?: Period[];
    borrowed?: false;
}

export interface GroupDTO {
    id: string;
    name: string;
    description: string;
    admins: string[];
    members: {
        id: string,
        name: string,
    }[];
}

export interface UserDTO {
    userId: string;
    username: string;
}

export interface ItemQueryResult {

}
