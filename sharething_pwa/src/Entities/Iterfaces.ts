export interface Item {
    id: string;
    name: string;
    description: string;
    imageUrl?:string;
    [key: string]: any;
};

export function docToItem(document: firebase.firestore.QueryDocumentSnapshot){
    const item: Item = {
        id: document.id,
        name: document.data().name,
        description: document.data().description,
      };
      return item;
};