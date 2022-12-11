import { Timestamp } from "firebase/firestore";

export class Chats {
    chat:       Chat[]      = []; // list of message
    userID:     string[]    = []; // usersID participate in the conversations
    id:         string      = ""; // id chat
    lastUpdate: Timestamp   = Timestamp.now();
}


export class Chat {
    message:    string      = "";
    time:       Timestamp   = Timestamp.now();
    fromTo:     string      = ""; // message who send the message
    isRead:     boolean     =false;
}