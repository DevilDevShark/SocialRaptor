import { Timestamp } from "firebase/firestore";

export class Chats {
    chat:       Chat[]      = [];
    userID:     string[]    = [];
    id:         string      = "";
    lastUpdate: Timestamp   = Timestamp.now();
}


export class Chat {
    message:    string      = "";
    time:       Timestamp   = Timestamp.now();
    fromTo:     string      = "";
    isRead:     boolean     =false;
}