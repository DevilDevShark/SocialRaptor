import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./modules/login/components/login.component";
import { NewsLayoutComponent } from "./modules/news/components/news-layout/news-layout.component";
import { CommentComponent } from "./modules/news/components/comment/comment.component";
import { ChatComponent } from "./modules/chats/components/chatid/chat.component";
import { ChatsComponent } from "./modules/chats/components/chats/chats.component";
import { UserProfileComponent } from "./modules/user-profile/components/user-profile/user-profile.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToUsers = () => redirectLoggedInTo(["/news"]);

const routes: Routes = [
  {
    component: LoginComponent,
    path: "login",
    loadChildren: () => import("./modules/login/login.module").then((module) => module.LoginModule),
    ...canActivate(redirectLoggedInToUsers),
  },
  {
    component: UserProfileComponent,
    path: "user/:id",
    loadChildren: () => import("./modules/user-profile/user-profile.module").then((module) => module.UserProfileModule),
    ...canActivate(redirectUnauthorizedToLogin),
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
  },
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
    path: "**",
    component: LoginComponent,
    loadChildren: () => import("./modules/login/login.module").then((module) => module.LoginModule),
    ...canActivate(redirectLoggedInToUsers),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
