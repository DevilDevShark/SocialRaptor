import { Component, Input, OnInit } from '@angular/core';
import { Publication } from "../../../../core/models/publication";
import { NewsService } from "../../services/news.service";
import * as firebase from "firebase/firestore";

@Component({
    selector: 'app-news[publication]',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    // region Attributes

    @Input() publication: Publication = new Publication();
    @Input() isComment: boolean = false;

    connectedUserAlreadyLikeThePost: boolean | null= null;

    // endregion

    constructor(private newsService: NewsService) {
    }

    ngOnInit(): void {

        // Get the index of the userConnected on the list
        let indexOfUserConnected = this.publication.like.indexOf('sandra');

        // If the user connected have already like the publication we removed the like
        this.connectedUserAlreadyLikeThePost = indexOfUserConnected !== -1;
        //console.log('pub ', this.publication);
    }

    /**
     * Get the number of days before today
     */
    getNbDayBefore(): number {

        let todayDate = firebase.Timestamp.now();
        return 4;
        //return (todayDate.toDate().getTime() - this.publication?.date?.toDate().getTime()) / (1000 * 3600 * 24);
    }

    addLike(publicationClicked: Publication) {
        // Get the index of the userConnected on the list
        let indexOfUserConnected = publicationClicked.like.indexOf('sandra');

        // If the user connected have already like the publication we removed the like
        indexOfUserConnected !== -1 ? publicationClicked.like.splice(indexOfUserConnected, 1):  publicationClicked.like?.push('sandra');

        this.newsService.updatePublication(publicationClicked).then(() => this.connectedUserAlreadyLikeThePost = !this.connectedUserAlreadyLikeThePost);
    }

}
