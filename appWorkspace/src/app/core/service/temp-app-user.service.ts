import { Injectable } from "@angular/core";
import { collection, CollectionReference, DocumentData } from "firebase/firestore";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { Firestore } from "@angular/fire/firestore";
import { AppUser } from "../models/appUser";

@Injectable({
    providedIn: "root",
})
export class TempAppUserService {
    publicationsCollection: CollectionReference<DocumentData>;

    public constructor(private genericFirestoreService: GenericFirestoreService,
                       private genericStorageService: GenericStorageService,
                       private firestore: Firestore) {
        this.publicationsCollection = collection(this.firestore, 'user');
    }

    public updateConnectedUser(user: AppUser) {
        return this.genericFirestoreService.update<AppUser>('user', user);
    }
}