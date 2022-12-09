import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

@NgModule({
  declarations: [ LoginComponent ],
  exports: [
    LoginComponent
  ],
    imports: [
        CoreModule,
        SharedModule,
        MatDividerModule,
        MatButtonModule
    ]
})

export class LoginModule {}
