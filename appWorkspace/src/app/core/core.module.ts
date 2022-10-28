import { NgModule } from "@angular/core";
import {AuthenticationService} from "./service/authentication.service";

const providers= [ AuthenticationService ];

@NgModule({
  providers: [ ...providers ]
})

export class CoreModule {}
