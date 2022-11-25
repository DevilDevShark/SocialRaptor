import {AfterViewInit, Component} from '@angular/core';
import {AuthenticationService} from "./core/service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'appWorkspace';

  constructor(private auth: AuthenticationService) {
  }

  ngAfterViewInit() {
    this.auth.getUserUID();
  }


}
