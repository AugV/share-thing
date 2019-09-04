// export interface Item {
//     groups: string[];
//     name: string;
//     owner: string;
// }

export default class Item {
    name: string;
    constructor(document: firebase.firestore.DocumentData) {
        this.name = document.name;
    }
}