import {collection, CollectionReference, DocumentData, DocumentReference} from "firebase/firestore";
import {GenericFirestoreService} from "../../../core/service/generic-firestore.service";
import {GenericStorageService} from "../../../core/service/generic-storage.service";
import {Firestore} from "@angular/fire/firestore";
import {FIREBASE_COLLECTION_PATHS} from "../../../core/constants/constants";
import {Injectable} from "@angular/core";
import {AppUser} from "../../../core/models/appUser";

@Injectable({
    providedIn: "root",
})
export class LoginService {

    usersCollection: CollectionReference<DocumentData>;

    public constructor(private genericFirestoreService: GenericFirestoreService,
                       private genericStorageService: GenericStorageService,
                       private firestore: Firestore) {
        this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USER);
    }

    public addConnectedUser(user: AppUser, customId: string): Promise<void> {
        return this.genericFirestoreService.createWithCustomID(this.usersCollection, user, customId);
    }

}