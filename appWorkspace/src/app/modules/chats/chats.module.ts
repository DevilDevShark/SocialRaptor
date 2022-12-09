import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ChatComponent } from "./components/chatid/chat.component";
import { ChatsComponent } from "./components/chats/chats.component";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

@NgModule({
    declarations: [ChatsComponent, ChatComponent],
    exports: [ChatsComponent, ChatComponent],
    imports: [CommonModule, SharedModule]
})

export class ChatsModule {
    
}