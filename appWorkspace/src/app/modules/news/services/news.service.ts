import {Injectable} from "@angular/core";
import { collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Firestore } from "@angular/fire/firestore";
import { Publication } from "../../../core/models/publication";
import { GenericFirestoreService } from "../../../core/service/generic-firestore.service";
import { FIREBASE_COLLECTION_PATHS } from "../constants/constants";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class NewsService {

    publicationsCollection: CollectionReference<DocumentData>;

    public constructor(private genericFirestoreService: GenericFirestoreService,
                       private firestore: Firestore) {
        this.publicationsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.PUBLICATION);
    }

    public addPublication(publication: Publication): Promise<DocumentReference<DocumentData>> {
        return this.genericFirestoreService.create(this.publicationsCollection, publication);
    }

    public getAllPublication(): Observable<Publication[]>{
        return this.genericFirestoreService.fetchAll<Publication>(this.publicationsCollection, 'date');
    }

    public getNewById(id: string): Observable<Publication>
    {
        return this.genericFirestoreService.fetchById("publications", id);
    }

    public updatePublication(publication: Publication) {
        return this.genericFirestoreService.update<Publication>('publications', publication );
    }
}