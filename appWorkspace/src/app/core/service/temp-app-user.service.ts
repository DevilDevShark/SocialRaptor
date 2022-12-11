import { Injectable } from "@angular/core";
import { collection, CollectionReference, DocumentData } from "firebase/firestore";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { Firestore } from "@angular/fire/firestore";
import { AppUser } from "../models/appUser";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class TempAppUserService {
    usersCollection: CollectionReference<DocumentData>;

    public constructor(private genericFirestoreService: GenericFirestoreService,
                       private genericStorageService: GenericStorageService,
                       private firestore: Firestore) {
        this.usersCollection = collection(this.firestore, 'user');
    }

    public updateUser(user: AppUser) {
        return this.genericFirestoreService.update<AppUser>('user', user);
    }

    public getFriends(friendsId: string[]): Observable<AppUser[]>
    {
        return this.genericFirestoreService.fetchByArrayProperty<AppUser>(this.usersCollection, 'id', friendsId);
    }

    public getSearchingUsers(): Observable<AppUser[]>
    {
        return this.genericFirestoreService.fetchAll<AppUser>(this.usersCollection, "creationAccountDate" , "asc");
    }
}