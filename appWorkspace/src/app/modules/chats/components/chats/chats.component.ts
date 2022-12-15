import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chat, Chats } from 'src/app/core/models/chat';
import { ChatsService } from '../../service/chats.service';
import { AuthenticationService } from "../../../../core/service/authentication.service";
import { TempAppUserService } from "../../../../core/service/temp-app-user.service";
import { AppUser } from "../../../../core/models/appUser";
import { Observable } from "rxjs";


@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

    // region Attributes

    public chats?: Observable<Chats[]>;
    public userConnected: AppUser | null = new AppUser();

    // endregion

    constructor(private chatService: ChatsService,
                private auth: AuthenticationService,
                private tempUserService: TempAppUserService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.userConnected = this.auth.userInfo;
            if (!!this.userConnected?.chats_id) {
                this.chats = this.chatService.getChatsListByChatId(this.userConnected.chats_id);
                // Detect change update the visual
                this.cd.detectChanges();
            }

        }, 1000);

    }

    getFriendConversationName(chat: Chat[]): string {
        const chatWithFromToDifferentToConnectedUser: any = chat.find(el => el.fromTo !== this.userConnected?.userName);
        return !!chatWithFromToDifferentToConnectedUser ? chatWithFromToDifferentToConnectedUser.fromTo: 'Votre nouveau correspondant mystère';
    }

    /**
     * Get the last message of the conversation and show the answer
     * @param fromTo Author of the last message
     * @param message
     */
    getLastChatMessage(fromTo: string, message: string) {
        const startM = fromTo === this.userConnected?.userName ? "Vous avez écrit: " : fromTo + "A écrit: ";
        return startM + message;
    }
}
