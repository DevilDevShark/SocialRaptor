// import {Publication} from "./publication";

export class User {
    id: string = '';
    user_name?: string;
    age?: number;
    description?: string;
    friends: [] = []; // list of user id
    followed_account_id: [] = []; // list of followed_account
    publications: [] = []; // list of publications_id
    chats_id: [] = []; // list of chats_id
}