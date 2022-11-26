import { Injectable } from "@angular/core";
import {
    Auth,
    authState,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    User,
    UserCredential,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "@angular/fire/auth";
import { EMPTY, Observable } from "rxjs";
import { GenericFirestoreService } from "./generic-firestore.service";
import { AppUser } from "../models/appUser";


@Injectable({
    providedIn: "root",
})
export class AuthenticationService {

    public user: Observable<User | null> = EMPTY;
    public userFirebase: User | null = null;
    public userInfo: AppUser | null = null;

    // region constructor

    constructor(private readonly auth: Auth, public gFS: GenericFirestoreService) {
        if (this.auth) {
            this.user = authState(this.auth);
            onAuthStateChanged(
                this.auth,
                (user: User | null) => {
                    this.userFirebase = user;
                    console.log("USER : ", this.userFirebase);
                    // Bad practice
                    this.getUserUID();
                },
                (error: Error) => {
                    console.log("ERROR : ", error);
                }
            );
        }
    }

    // endregion

    /**
     * Get the User data of the connected User
     */
    public getUserUID() {
        if (!!this.userFirebase) {
            this.gFS.fetchById<AppUser>("user", this.userFirebase.uid).subscribe(
                (user: AppUser) => {
                    this.userInfo = user;
                });
        }
    }

    public async signUp(email: string, password: string, firstname: string = '', lastname: string = ''): Promise<UserCredential | null> {
        try {
            const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const displayName: string = `${lastname.toLocaleUpperCase()}`;

            await updateProfile(data.user, {displayName});
            return data;

        } catch (error) {
            return null;
        }
    }

    public async signIn(email: string, password: string): Promise<UserCredential | null> {
        try {
            return await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error: unknown) {
            console.log(error);
            return null;
        }
    }

    public async signOut(): Promise<void> {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.log(error);
        }
    }

}
