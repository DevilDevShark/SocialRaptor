import {Injectable} from "@angular/core";
import { collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Firestore } from "@angular/fire/firestore";
import { Publication } from "../../../core/models/publication";
import { GenericFirestoreService } from "../../../core/service/generic-firestore.service";
import { FIREBASE_COLLECTION_PATHS } from "../constants/constants";
import { Observable } from "rxjs";
import { UploadMetadata, UploadResult } from "@angular/fire/storage";
import { GenericStorageService } from "../../../core/service/generic-storage.service";

@Injectable({
    providedIn: "root",
})
export class NewsService {

    publicationsCollection: CollectionReference<DocumentData>;

    public constructor(private genericFirestoreService: GenericFirestoreService,
                       private genericStorageService: GenericStorageService,
                       private firestore: Firestore) {
        this.publicationsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.PUBLICATION);
    }

    public addPublication(publication: Publication): Promise<DocumentReference<DocumentData>> {
        return this.genericFirestoreService.create(this.publicationsCollection, publication);
    }

    public getAllPublication(userId: string): Observable<Publication[]>{
        return this.genericFirestoreService.fetchByProperty<Publication>(this.publicationsCollection, 'id', userId);
    }

    public getAllPublicationByFriends(friendsId: string[]): Observable<Publication[]>{
        return this.genericFirestoreService.fetchByArrayProperty<Publication>(this.publicationsCollection, 'userId', friendsId);
    }

    public getNewById(id: string): Observable<Publication>
    {
        return this.genericFirestoreService.fetchById("publications", id);
    }

    public updatePublication(publication: Publication) {
        return this.genericFirestoreService.update<Publication>('publications', publication );
    }

    public deletePublication(publication: Publication) {
        return this.genericFirestoreService.delete('publications', publication.id);
    }

    // image function

    public uploadImageNews(fileName: string, file: File): Promise<UploadResult> {
        const metadata: UploadMetadata = {};

        return this.genericStorageService.uploadFile(file, `news/${fileName}`, metadata);
    }

    // endregion
}