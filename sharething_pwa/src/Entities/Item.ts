export default class Item {
    id: string;
    name: string;
    description: string;
    [key: string]: any;
    constructor(document: firebase.firestore.QueryDocumentSnapshot) {
        this.id = document.id;
        this.name = document.data().name;
        this.description = '';
    }
}