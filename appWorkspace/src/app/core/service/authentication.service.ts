import {Injectable} from "@angular/core";
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
import {EMPTY, Observable, of} from "rxjs";
import {GenericFirestoreService} from "./generic-firestore.service";
import {AppUser} from "../models/appUser";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  public user: Observable<User | null> = EMPTY;
  public userInfo: AppUser | null = null;

  // region constructor

  constructor(private readonly auth: Auth, public gFS: GenericFirestoreService) {
    if (this.auth) {
      this.user = authState(this.auth);
      onAuthStateChanged(
        this.auth,
        (user: User | null) => {
          this.user = of(user);
          console.log("USER : ", user);
        },
        (error: Error) => {
          console.log("ERROR : ", error);
        }
      );
    }
  }

  // endregion

  public getUserUID() {
    this.user.subscribe(event => {
      if(event != null) {
        let uI: Observable<AppUser> = this.gFS.fetchById("user", event.uid);
        uI.subscribe((event: AppUser) => this.userInfo = event);
      }
    });
  }

  public async signUp(email: string, password: string, firstname: string= '', lastname: string = ''): Promise<UserCredential | null> {
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
