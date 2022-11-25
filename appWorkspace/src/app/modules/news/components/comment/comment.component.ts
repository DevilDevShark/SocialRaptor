import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Publication} from "../../../../core/models/publication";
import {NavigationService} from "../../../../shared/directives/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../../core/service/authentication.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

  // region attributes

  pub$: Observable<Publication> | null = null ;

  // endregion

  // region constructor

  constructor(public navigation: NavigationService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private newsService: NewsService, private a: AuthenticationService) { }

  // endregion


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pub$ = this.newsService.getNewById(params['id']);
    });
  }

  backWithNavigation() {
    this.navigation.back();
  }
}
