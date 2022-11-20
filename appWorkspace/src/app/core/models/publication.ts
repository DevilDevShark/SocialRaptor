import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export class Publication {
    id: string = '';
    userName?: string;
    date?: Timestamp;
    text?: string;
    like: string[] = [];
    comment: Publication[] | null = null;
    imgUrl: string | null = null;

    constructor() {
    }
}