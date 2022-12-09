import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChatsListItemComponent } from "./components/chats-list-item/chats-list-item.component";
import { ChatComponent } from "./components/chatid/chat.component";
import { ChatsComponent } from "./components/chats/chats.component";
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";

const commponents: [ ChatsComponent, ChatComponent, ChatsListItemComponent ];

@NgModule({
    declarations: [ ...components],
    exports: [ ...components ],
    imports: [CommonModule, SharedModule]
})

export class ChatsModule {}