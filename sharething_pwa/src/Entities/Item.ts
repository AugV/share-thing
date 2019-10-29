export default class Item {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    [key: string]: any;

    constructor(document: firebase.firestore.QueryDocumentSnapshot) {
        this.id = document.id;
        this.name = document.data().name;
        this.description = '';
    }
    // constructor(id: string, name: string, description: string) {
    //     this.id = id;
    //     this.name = name;
    //     this.description = description;
    // }
}