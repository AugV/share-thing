export default class Item {
    id: string;
    name: string;
    constructor(document: firebase.firestore.QueryDocumentSnapshot) {
        this.id = document.id;
        this.name = document.data().name;
    }
}