import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title: string;
  userID = '';
  isDarkTheme: BehaviorSubject<boolean>;
  currentUserData? : Observable<User | undefined>

  constructor(private uts: UtilitiesService, private route: ActivatedRoute, private us: UserService) {
    this.title = 'Profile';
    this.userID = this.route.snapshot.data.user.uid;
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.data.user.uid;
    this.isDarkTheme = this.uts.isDarkTheme;
    this.currentUserData = this.us.getUserData(this.userID);
  }

}
