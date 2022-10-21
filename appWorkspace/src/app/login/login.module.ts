import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    MatCardModule
  ]
})

export class LoginModule {}
