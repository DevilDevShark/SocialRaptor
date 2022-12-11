import * as f from "firebase/firestore";
import Timestamp = f.Timestamp;

export class AppUser {
    id: string = '';
    userName: string = '';
    age?: number;
    creationAccountDate: Timestamp = f.Timestamp.now();
    description?: string;
    friends: any[] = []; // list of user id
    followed_account_id: any[] = []; // list of followed_account
    publications: any[] = []; // list of publications_id
    chats_id: any[] = []; // list of chats_id
    imgPath: string | null = null;

    constructor() {
    }
}