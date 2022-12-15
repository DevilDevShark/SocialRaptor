import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {LoginService} from "../service/login.service";
import * as firebase from "firebase/firestore";
import {
    SwalConfigProfileComponent
} from "../../../shared/utils-component/swal-config-profile/swal-config-profile.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('swalConfigProfile') swalConfigProfile?: SwalConfigProfileComponent;

    public emailCtrl = new FormControl();
    public passwordCtrl = new FormControl();

    constructor(public route: Router,
                private auth: AuthenticationService,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
    }

    connectUser() {
        console.log(this.emailCtrl.value);
        console.log(this.passwordCtrl.value);
        this.auth.signIn(this.emailCtrl.value, this.passwordCtrl.value).then(r => {
            if (r === undefined) {
                console.log("undefined");
            } else if (r === null) {
                console.log("null");
            } else {
                window.location.reload();
                this.route.navigate(['/news']);
            }
        });
    }

    register() {
        this.auth.signUp(this.emailCtrl.value, this.passwordCtrl.value).then(r => {
            if (r === undefined) {
                console.log("undefined");
            } else if (r === null) {
                console.log("null");
            } else {
                let createAt = firebase.Timestamp.now();
                let newU = {
                    id: r?.user.uid,
                    userName: 'Anonymous',
                    age: 0,
                    creationAccountDate: createAt,
                    description: '',
                    friends: [],
                    followed_account_id: [],
                    publications: [],
                    chats_id: [],
                    imgPath: ''
                };
                this.loginService.addConnectedUser(newU, r?.user.uid).then(() => {
                    // display the config profile after the register for forced the user to configure his profile
                    this.swalConfigProfile?.displaySwal();
                });
            }
        });
    }


}
