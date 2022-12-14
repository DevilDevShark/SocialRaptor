import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Publication } from "../../../../core/models/publication";
import { NewsService } from "../../services/news.service";
import {AppUser} from "../../../../core/models/appUser";
import {AuthenticationService} from "../../../../core/service/authentication.service";

@Component({
    selector: 'app-news[publication]',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

    // region Attributes

    @Input() publication: Publication = new Publication();
    @Input() isComment: boolean = false;

    connectedUserAlreadyLikeThePost: boolean | null= null;
    connectedUser: AppUser | null = null;

    userImgProfile: string | undefined = '';

    // endregion

    // region constructor

    constructor(private newsService: NewsService,
                private auth: AuthenticationService,
                private cd: ChangeDetectorRef) {}

    // endregion

    ngOnInit(): void {
        this.connectedUser = this.auth.userInfo;
        if(!!this.connectedUser)
        {
             if(!!this.connectedUser.imgPath) {
                 this.userImgProfile = this.connectedUser.imgPath;
                 this.cd.detectChanges();
             }

            // Get the index of the userConnected on the list
            let indexOfUserConnected = this.publication.like.indexOf(this.connectedUser.userName);

            // If the user connected have already like the publication we removed the like
            this.connectedUserAlreadyLikeThePost = indexOfUserConnected !== -1;
            //console.log('pub ', this.publication);
            this.cd.detectChanges();
        }


    }

    ngOnChange() {
        this.connectedUser = this.auth.userInfo;
    }

    addLike(publicationClicked: Publication) {
        // Get the index of the userConnected on the list
        let indexOfUserConnected = publicationClicked.like.indexOf(<string>this.connectedUser?.userName);

        // If the user connected have already like the publication we removed the like
        indexOfUserConnected !== -1 ? publicationClicked.like.splice(indexOfUserConnected, 1):  publicationClicked.like?.push(<string>this.connectedUser?.userName);

        this.newsService.updatePublication(publicationClicked).then(() => this.connectedUserAlreadyLikeThePost = !this.connectedUserAlreadyLikeThePost);
    }

    /**
     * Delete publication
     * @param publication
     */
    removePublication(publication: Publication) {
        this.newsService.deletePublication(publication).then(() => console.log('removed'));
    }

    isUserCanDeletePublication(): boolean {
        return this.publication.userName === this.connectedUser?.userName;
    }
}
