import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { Publication } from "../../../../core/models/publication";
import {NavigationService} from "../../../../shared/directives/navigation.service";

@Component({
    selector: 'app-news-layout',
    templateUrl: './news-layout.component.html',
    styleUrls: ['./news-layout.component.scss']
})
export class NewsLayoutComponent implements OnInit {

    // region Attributes

    publication: Publication[] = [];

    // endregion

    // region constructor

    constructor(private newsService: NewsService, public navigation: NavigationService) {
    }

    // endregion
    ngOnInit(): void {
        this.newsService.getAllPublication().subscribe((data: Publication[]) => {
            console.log("on news-layout");
            this.publication = data
        });
        /**this.route.paramMap
         .switchMap((params: ParamMap) => this.newsService.getNews(+params.get('id')))
         .subscribe(hero => this.hero = hero);**/
    }



}
