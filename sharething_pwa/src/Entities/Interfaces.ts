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

    console.log('docToCONVO');
    console.log(convo);
    return convo;
}
