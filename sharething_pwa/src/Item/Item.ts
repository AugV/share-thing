import undefined from "firebase/empty-import";

export default class Item {
    id: string;
    name: string;
    description: string;
    constructor(document: firebase.firestore.QueryDocumentSnapshot) {
        this.id = document.id;
        this.name = document.data().name;
        this.description = '';
    }
}