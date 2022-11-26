import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as firebase from "firebase/firestore";
import {NewsService} from "../../services/news.service";
import {FormControl, Validators} from "@angular/forms";
import {Publication} from "../../../../core/models/publication";
import {AppUser} from "../../../../core/models/appUser";
import {AuthenticationService} from "../../../../core/service/authentication.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-news',
    templateUrl: './add-news.component.html',
    styleUrls: ['./add-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewsComponent implements OnInit {

    // region Attributes

    @Input() originalPublication?: Publication;

    // form control

    descriptionCtrl: FormControl = new FormControl('', Validators.required);
    imgCtrl: FormControl = new FormControl('', Validators.required);

    // endregion

    public url: any;
    imageSrc: string = '';

    currentUser: AppUser | null = null;

    subscription: Subscription = new Subscription();

    // endregion

    // region constructor

    constructor(private newsService: NewsService,
                private authService: AuthenticationService) {
    }

    // endregion

    ngOnInit(): void {
    }

    readURL(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.imgCtrl.setValue(reader.result);

            this.imageSrc = file.name;
            reader.readAsDataURL(file);
        }
    }

    activeSendBtn(): boolean {
        return this.descriptionCtrl.valid || this.imgCtrl.valid;
    }

    send() {
        // Get the current user data
        this.currentUser = this.authService.userInfo;
        if(!!this.currentUser)
        {
            let createAt = firebase.Timestamp.now();
            /**
             * Init a new publication
             */
            let newP = {
                id: '',
                userName: this.currentUser.userName,
                userId: this.currentUser.id,
                date: createAt,
                text: this.descriptionCtrl.value,
                like: [],
                imgUrl: this.imgCtrl.value,
                comment: []
            };
            /**
             * Here if "originalPublication" is filled (mean the user are on the news details and
             * will add a comment) instead of publish a new we update the original publication by adding
             * the new comment on the list
             */
            if (!!this.originalPublication) {
                this.originalPublication.comment?.push(newP);
                this.newsService.updatePublication(this.originalPublication).then();
            }
            else
            {
                this.newsService.addPublication(newP).then();
            }
            if(!!this.imgCtrl.value) this.newsService.uploadImageNews(this.imageSrc, this.imgCtrl.value).then();
            this.resetForms();
        }

    }

    resetForms()
    {
        this.descriptionCtrl.reset();
        this.imgCtrl.reset();
    }
}
