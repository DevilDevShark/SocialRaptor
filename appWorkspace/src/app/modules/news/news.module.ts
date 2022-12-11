import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { NewsComponent } from "./components/news/news.component";
import { NewsLayoutComponent } from './components/news-layout/news-layout.component';
import { NewsService } from "./services/news.service";
import { CoreModule } from "../../core/core.module";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommentComponent } from './components/comment/comment.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { RouterModule } from "@angular/router";

const components = [ NewsComponent , NewsLayoutComponent, CommentComponent, AddNewsComponent];

@NgModule({
  declarations: [ ...components  ],
  exports: [
    ...components
  ],
    imports: [
        SharedModule,
        CoreModule,
        CommonModule,
        MatButtonModule,
        MatExpansionModule,
        RouterModule
    ],
  providers: [ NewsService ]
})

export class NewsModule {}
