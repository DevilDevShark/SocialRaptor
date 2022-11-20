import {Component, OnInit} from '@angular/core';
import {Publication} from "../../../../core/models/publication";
import {NavigationService} from "../../../../shared/directives/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  // region attributes

  publicationInitial: Publication = new Publication();

  // endregion

  // region constructor

  constructor(public navigation: NavigationService, private route: ActivatedRoute, private newsService: NewsService) { }

  // endregion


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log("PARAM", params);

      this.newsService.getNewById(params['id']).subscribe( data => {
        //console.log("DATA", data);
        this.publicationInitial = data;
      });
    });
  }

  backWithNavigation() {
    this.navigation.back();
  }
}
