export interface Item {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    ownerId?: string;
    [key: string]: any;
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

export function docToItem(document: firebase.firestore.QueryDocumentSnapshot): Item {
    const item: Item = {
        id: document.id,
        name: document.data().name,
        description: document.data().description,
        imageUrl: document.data().imageUrl,
        ownerId: document.data().ownerId,
    };

    return item;
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
