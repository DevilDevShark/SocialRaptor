import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {LoginService} from "../service/login.service";
import * as firebase from "firebase/firestore";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public emailCtrl = new FormControl();
    public passwordCtrl = new FormControl();

    constructor(public router: Router, private auth: AuthenticationService,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
    }

    connectUser() {
        console.log(this.emailCtrl.value);
        console.log(this.passwordCtrl.value);
        this.auth.signIn(this.emailCtrl.value, this.passwordCtrl.value).then(() => console.log("connected"));
    }

    register() {
        this.auth.signUp(this.emailCtrl.value, this.passwordCtrl.value).then(r => {
            if (r === undefined) {
                console.log("undefined");
            } else if (r === null) {
                console.log("undefined");
            } else {
                let createAt = firebase.Timestamp.now()
                let newU = {
                    id: r?.user.uid,
                    userName: 'Anonymous',
                    age: 0,
                    creationAccountDate: createAt,
                    description: '',
                    friends: [],
                    followed_account_id: [],
                    publications: [],
                    chats_id: []
                };
                this.loginService.addConnectedUser(newU, r?.user.uid).then(r => {
                    console.log("User created");
                });
            }
        });
    }


}
