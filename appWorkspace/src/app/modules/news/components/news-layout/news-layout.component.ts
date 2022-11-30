import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { Publication } from "../../../../core/models/publication";
import { AuthenticationService } from "../../../../core/service/authentication.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-news-layout',
    templateUrl: './news-layout.component.html',
    styleUrls: ['./news-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsLayoutComponent implements OnInit {

    // region Attributes

    publications: Observable<Publication[]> | null = null;

    // endregion

    // region constructor

    constructor(private newsService: NewsService,
                private auth: AuthenticationService,
                private cd: ChangeDetectorRef) {
    }

    // endregion

    // region lifecycle
    ngOnInit(): void {
        /**
         * Need to put a set timeout for let the "userInfo" initialize
         */
        setTimeout(() => {
            let user = this.auth.userInfo;
            // update view
            this.cd.detectChanges();
            if (user) {
                user.friends.push(user.id); //for include her post on the fetch
                this.publications = this.newsService.getAllPublicationByFriends(user.friends);
                this.cd.detectChanges(); // update the view
            }
        }, 1000);
    }

    // endregion

}