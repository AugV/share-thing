export interface Item {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    [key: string]: any;
}

export interface Conversation {
    id: string;
    itemId: string;
    itemImg: string;
    itemName: string;
    ownerId: string;
    seekerId: string;
}

export interface Message {
    id: string;
    author: string;
    text: string;
    time: string;
}

export function docToItem(document: firebase.firestore.QueryDocumentSnapshot): Item {
    const item: Item = {
        id: document.id,
        name: document.data().name,
        description: document.data().description,
        imageUrl: document.data().imageUrl,
    };

    return item;
}

export function docToConvo(document: firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot): Conversation {
    const convo: Conversation = {
        id: document.id,
        itemId: document.data()!.itemId,
        itemImg: document.data()!.itemImg,
        itemName: document.data()!.itemName,
        ownerId: document.data()!.ownerId,
        seekerId: document.data()!.seekerId,
    };

    return convo;
}

export function docToMessage(document: firebase.firestore.QueryDocumentSnapshot): Message {
    const message: Message = {
        id: document.id,
        author: document.data().author,
        text: document.data().text,
        time: document.data().time,
    }

    return message;
}
