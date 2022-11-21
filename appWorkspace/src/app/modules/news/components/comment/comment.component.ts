import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Publication} from "../../../../core/models/publication";
import {NavigationService} from "../../../../shared/directives/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

  // region attributes

  publicationInitial: Publication = new Publication();
  pub$: Observable<Publication> | null = null ;

  // endregion

  // region constructor

  constructor(public navigation: NavigationService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private newsService: NewsService) { }

  // endregion


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pub$ = this.newsService.getNewById(params['id']);
      /*this.newsService.getNewById(params['id']).subscribe( data => {
        console.log("data", data);
        this.publicationInitial = data;
        this.cd.detectChanges();
      });*/
    });
  }

  backWithNavigation() {
    this.navigation.back();
  }
}
