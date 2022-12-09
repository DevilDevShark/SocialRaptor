import { NgModule } from "@angular/core";
import { ChatsListItemComponent } from "./components/chats-list-item/chats-list-item.component";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

@NgModule({
    imports: [
        SharedModule,
        CoreModule
    ],
    declarations:[ChatsListItemComponent],
    exports:[ChatsListItemComponent]
})

export class ChatsModule {}