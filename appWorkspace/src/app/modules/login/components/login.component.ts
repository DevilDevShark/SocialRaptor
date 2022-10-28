import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public emailCtrl = new FormControl();
  public passwordCtrl = new FormControl();

  constructor(public router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  connectUser() {
    console.log(this.emailCtrl.value);
    console.log(this.passwordCtrl.value);
    this.auth.signIn(this.emailCtrl.value, this.passwordCtrl.value).then(() => console.log("connected"));
  }

  register(){
    this.auth.signUp(this.emailCtrl.value, this.passwordCtrl.value).then(() => console.log("register"));
  }



}
