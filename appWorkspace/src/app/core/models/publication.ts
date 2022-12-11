import * as f from "firebase/firestore";
import Timestamp = f.Timestamp;

export class Publication {
    id: string = '';
    userName?: string;
    userId: string = '';
    date: Timestamp = f.Timestamp.now();
    text?: string;
    like: string[] = [];
    comment: Publication[] | null = null;
    imgUrl: string | null = null;

    constructor() {
    }
}