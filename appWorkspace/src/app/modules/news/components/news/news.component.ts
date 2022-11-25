import { Component, Input, OnInit } from '@angular/core';
import { Publication } from "../../../../core/models/publication";
import { NewsService } from "../../services/news.service";

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
    getNbDayBefore(): string {

        let currentDate = new Date(); // today's date
        let creationDate = this.publication.date?.toDate().getTime();

        let deltaInMinutes = Math.round((currentDate.getTime() -  creationDate) /  60 / 1000);
        let deltaInHours =  Math.round(deltaInMinutes / 60);
        let deltaInDays =  Math.round(deltaInHours / 24);

        return deltaInDays > 0 ? deltaInDays + 'j':
            deltaInHours < 25 && deltaInHours > 0 ? deltaInHours + 'h':
                deltaInMinutes > 0 && deltaInMinutes < 60 ? deltaInMinutes + "min":
                    '0s';
    }

    addLike(publicationClicked: Publication) {
        // Get the index of the userConnected on the list
        let indexOfUserConnected = publicationClicked.like.indexOf('sandra');

        // If the user connected have already like the publication we removed the like
        indexOfUserConnected !== -1 ? publicationClicked.like.splice(indexOfUserConnected, 1):  publicationClicked.like?.push('sandra');

        this.newsService.updatePublication(publicationClicked).then(() => this.connectedUserAlreadyLikeThePost = !this.connectedUserAlreadyLikeThePost);
    }

}
