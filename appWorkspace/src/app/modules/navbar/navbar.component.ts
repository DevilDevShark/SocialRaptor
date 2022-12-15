import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../core/service/authentication.service";
import {Router} from "@angular/router";
import {TempAppUserService} from "../../core/service/temp-app-user.service";
import {FormControl} from "@angular/forms";
import {debounceTime, Observable, of} from "rxjs";
import {AppUser} from "../../core/models/appUser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // region Attributes

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchInputCtrl = new FormControl();
  usersFind$: Observable<AppUser[]> | null = null;

  currentUser: Observable<AppUser | null> | null = null;

  // endregion

  constructor( private auth: AuthenticationService,
               private cd: ChangeDetectorRef,
               private tempAppUser: TempAppUserService,
               private route: Router) { }

  ngOnInit() {
    setTimeout(() =>{
      this.currentUser = of(this.auth.userInfo);
      this.cd.detectChanges();
    }, 1000);
  }

  /**
   * On click of the power button the user was disconnected and redirect to the login page
   */
  logout() {
    this.auth.signOut().then(() => this.route.navigate(['login']))
  }

  dynamicSearch() {
    debounceTime(1000);
    this.tempAppUser.getSearchingUsers().subscribe(data => {
      let users: any;
      if(!!this.searchInputCtrl.value)
      {
        users = data.filter((item: AppUser) => {
          if(item.userName.startsWith(this.searchInputCtrl.value)) return item;
          return;
        });
      }

      if(!!users)this.usersFind$ = of(users);
      else this.usersFind$ = null;
    });
  }
}
