import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./modules/login/components/login.component";
import {NewsComponent} from "./modules/news/components/news.component";

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
    component: NewsComponent,
    path: "news",
    loadChildren: () => import("./modules/news/news.module").then((module) => module.NewsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
