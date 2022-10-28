import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewsComponent} from "./components/news.component";

const components = [ NewsComponent ];

@NgModule({
  declarations: [ ...components ],
  exports: [
    ...components
  ],
  imports: [
    SharedModule,
  ],
  providers: [ ]
})

export class NewsModule {}
