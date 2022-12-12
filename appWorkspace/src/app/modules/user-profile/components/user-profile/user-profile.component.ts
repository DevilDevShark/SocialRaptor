import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../../core/service/authentication.service";
import { TempAppUserService } from "../../../../core/service/temp-app-user.service";
import { Observable } from "rxjs";
import { AppUser } from "../../../../core/models/appUser";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // region Attributes

  userProfile!: Observable<AppUser>;
  public currentUser: AppUser | null = new AppUser();

  connectedUserAlreadyHaveThisFriend: boolean | null= null;
  userImgProfile: string | undefined = '';

  // endregion

  constructor(private temp: TempAppUserService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.currentUser = this.auth.userInfo;

      this.route.params.subscribe(params => {
        this.userProfile = this.temp.getUserById(params['id']);

        // check if the current user connected is already friend with the profile page user
        let element = this.currentUser?.friends?.find(friendsId => friendsId === params['id']);
        this.connectedUserAlreadyHaveThisFriend = !!element && element !== this.currentUser?.id;

        this.cd.detectChanges();
      });

      if(!!this.currentUser)
      {
          if(!!this.currentUser.imgPath) {
            this.userImgProfile = this.currentUser.imgPath;
            this.cd.detectChanges();
          }
      }

      this.cd.detectChanges();
    }, 1000);
  }

  addFriend(userProfilePage: AppUser) {
    if(!!this.currentUser)
    {
      this.currentUser.friends.push(userProfilePage.id);
      this.temp.updateUser(this.currentUser);

      // Update the nex friends too (not the right method but...)
      userProfilePage.friends.push(this.currentUser.id);
      this.temp.updateUser(userProfilePage).then(() => this.connectedUserAlreadyHaveThisFriend = !this.connectedUserAlreadyHaveThisFriend);

      this.cd.detectChanges();
    }

  }
}
