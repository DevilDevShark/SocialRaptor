import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChatComponent } from "./components/chatid/chat.component";
import { ChatsComponent } from "./components/chats/chats.component";
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule} from "@angular/router";
import { SwalNewConversationComponent } from './components/swal-new-conversation/swal-new-conversation.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

const components = [ ChatsComponent, ChatComponent, SwalNewConversationComponent];

@NgModule({
    declarations: [ ...components, ],
    exports: [ ...components ],
    imports: [ CommonModule, SharedModule, MatButtonModule, RouterModule, SweetAlert2Module ]
})

export class ChatsModule {}