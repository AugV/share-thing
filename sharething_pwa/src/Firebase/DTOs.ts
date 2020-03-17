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

export interface UserItemDTO {
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
