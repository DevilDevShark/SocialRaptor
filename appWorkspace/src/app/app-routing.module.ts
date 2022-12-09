import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./modules/login/components/login.component";
import { NewsLayoutComponent } from "./modules/news/components/news-layout/news-layout.component";
import { CommentComponent } from "./modules/news/components/comment/comment.component";
import { ChatsListItemComponent } from "./modules/chats/components/chats-list-item/chats-list-item.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToUsers = () => redirectLoggedInTo(["/news"]);

const routes: Routes = [
  {
    component: LoginComponent,
    path: "",
    loadChildren: () => import("./modules/login/login.module").then((module) => module.LoginModule),
    ...canActivate(redirectLoggedInToUsers),
  },
  {
    component: ChatComponent,
    path: "chat/:id",
    loadChildren: () => import("./modules/chats/chats.module").then((module) => module.ChatsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    component: ChatsComponent,
    path: "chats",
    loadChildren: () => import("./modules/chats/chats.module").then((module) => module.ChatsModule),
    ...canActivate(redirectUnauthorizedToLogin),

  {
    component: NewsLayoutComponent,
    path: "news",
    loadChildren: () => import("./modules/news/news.module").then((module) => module.NewsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: "news/:id",
    component: CommentComponent,
    loadChildren: () => import("./modules/news/news.module").then((module) => module.NewsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: "chats",
    component: ChatsListItemComponent,
    loadChildren: () => import("./modules/chats/chats.module").then((module) => module.ChatsModule),
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
