import { NgModule } from "@angular/core";
import {AuthenticationService} from "./service/authentication.service";
import {GenericFirestoreService} from "./service/generic-firestore.service";

const providers= [ AuthenticationService, GenericFirestoreService ];

@NgModule({
  providers: [ ...providers ]
})

export class CoreModule {}
