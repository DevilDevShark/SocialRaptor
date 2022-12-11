import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuVariable: boolean = false;
  constructor( private auth: AuthenticationService,
               private route: Router) { }

  ngOnInit(): void {
  }

  
  openMenu(){
    console.log("open menu marche")
    this.menuVariable=true;
  }

  /**
   * On click of the power button the user was disconnected and redirect to the login page
   */
  logout() {
    this.auth.signOut().then(() => this.route.navigate(['login']))
  }
}
