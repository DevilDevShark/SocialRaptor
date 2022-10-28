import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {MatCardModule} from "@angular/material/card";
import {AuthenticationService} from "./service/authentication.service";
import {MatDividerModule} from "@angular/material/divider";
import {AppModule} from "../app.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    MatCardModule,
    MatDividerModule,
    AppModule,
    MatButtonModule
  ],
  providers: [ AuthenticationService ]
})

export class LoginModule {}
