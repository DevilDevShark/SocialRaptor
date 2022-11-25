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

    @Input() orginalPublication?: Publication;

    descriptionCtrl: FormControl = new FormControl('', Validators.required);
    imgCtrl: FormControl = new FormControl('', Validators.required);
    public url: any;
    imageSrc: string = '';

    // endregion

    // region constructor

    constructor(private newsService: NewsService) {
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
        let createAt = firebase.Timestamp.now();
        let newP = {
            id: '',
            userName: 'Sandra',
            date: createAt,
            text: this.descriptionCtrl.value,
            like: [],
            imgUrl: this.imgCtrl.value,
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
        if(!!this.imgCtrl.value) this.newsService.uploadImageNews(this.imageSrc, this.imgCtrl.value).then();

    }
}
