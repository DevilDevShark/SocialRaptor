import { NgModule } from "@angular/core";
import { ChatsComponent } from "./components/chats/chats.component";

@NgModule({
    declarations:[ChatsComponent],
    exports:[ChatsComponent]
})

export class ChatsModule {}