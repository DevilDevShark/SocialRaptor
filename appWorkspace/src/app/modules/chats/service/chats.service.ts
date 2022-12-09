import { CdkObserveContent } from "@angular/cdk/observers";
import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { Chat, Chats } from "src/app/core/models/chat";
import { GenericFirestoreService } from "src/app/core/service/generic-firestore.service";
import { FIREBASE_COLLECTION_PATHS } from "../constants/constant";

@Injectable({
    providedIn:"root"
})

export class ChatsService {

chatsCollection: CollectionReference<DocumentData>;

public constructor(private genericFirestoreService:GenericFirestoreService,private fireStore:Firestore) {

    this.chatsCollection = collection(this.fireStore, FIREBASE_COLLECTION_PATHS.CHATS);

}

public getAllChats(): Observable<Chats[]>{
    return this.genericFirestoreService.fetchAll<Chats>(this.chatsCollection, 'lastUpdate');
}

public getChatById(id:string): Observable<Chats[]>{
    return this.genericFirestoreService.fetchByProperty<Chats>(this.chatsCollection,'id',id);
}

public addChats(chats: Chats): Promise<DocumentReference<DocumentData>> {
    let tmpChats = this.genericFirestoreService.create(this.chatsCollection, chats);
    tmpChats.then((dtmp)=>{
        chats.id = dtmp.id;
        this.updateChats(chats);
    })
    return tmpChats;
}
updateChats(chats: Chats) {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.CHATS,chats);
}






















}