import { NgModule } from "@angular/core";
import { ChatsComponent } from "./components/chats/chats.component";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

@NgModule({
    imports: [
        SharedModule,
        CoreModule
    ],
    declarations:[ChatsComponent],
    exports:[ChatsComponent]
})

export class ChatsModule {}