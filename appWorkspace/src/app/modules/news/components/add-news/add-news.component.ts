import {Component, Input, OnInit} from '@angular/core';
import * as firebase from "firebase/firestore";
import {NewsService} from "../../services/news.service";
import {FormControl, Validators} from "@angular/forms";
import {Publication} from "../../../../core/models/publication";

@Component({
    selector: 'app-add-news',
    templateUrl: './add-news.component.html',
    styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

    // region Attributes

    descriptionCtrl: FormControl = new FormControl('', Validators.required);
    @Input() orginalPublication?: Publication;

    // endregion

    // region constructor

    constructor(private newsService: NewsService) {
    }

    // endregion

    ngOnInit(): void {
    }

    activeSendBtn(): boolean {
        return this.descriptionCtrl.valid;
    }

    send() {
        let createAt = firebase.Timestamp.now();
        let newP = {
            id: '',
            userName: 'Sandra',
            date: createAt,
            text: this.descriptionCtrl.value,
            like: [],
            imgUrl: null,
            comment: []
        };
        // TODO user devra etre stocker et utilser
        if (!!this.orginalPublication) {
            this.orginalPublication.comment?.push(newP);
            this.newsService.updatePublication(this.orginalPublication).then();
        }
        else
        {
            this.newsService.addPublication(newP).then();
        }

    }

}
