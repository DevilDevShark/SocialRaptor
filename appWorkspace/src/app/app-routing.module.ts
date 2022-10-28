import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profile',
  component: ProfileComponent,
  canActivate : [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin },
  resolve : {user: FirebaseUserResolverService},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
