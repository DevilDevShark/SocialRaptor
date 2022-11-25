import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { NewsComponent } from "./components/news/news.component";
import { NewsLayoutComponent } from './components/news-layout/news-layout.component';
import { NewsService } from "./services/news.service";
import { CoreModule } from "../../core/core.module";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import { CommentComponent } from './components/comment/comment.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/components/login.component";
import {canActivate} from "@angular/fire/auth-guard";

const components = [ NewsComponent , NewsLayoutComponent, CommentComponent, AddNewsComponent];
const routes = [
    {
        path: "comment",
        component: CommentComponent,
        children: [
            {
                path: ":id",
                component: CommentComponent
            },
    ]
    }
]

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
        RouterModule,
        MatIconModule
    ],
  providers: [ NewsService ]
})

export class NewsModule {}
