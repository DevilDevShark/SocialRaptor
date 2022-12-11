import { ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import { TempAppUserService } from "../../../../core/service/temp-app-user.service";
import { AppUser } from "../../../../core/models/appUser";
import { Observable } from "rxjs";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Chats } from "../../../../core/models/chat";
import { Timestamp } from "firebase/firestore";
import { ChatsService } from "../../service/chats.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-swal-new-conversation[userConnected]',
  templateUrl: './swal-new-conversation.component.html',
  styleUrls: ['./swal-new-conversation.component.scss']
})
export class SwalNewConversationComponent {

  // region Attributes

  @Input() userConnected?: AppUser | null;
  @Input() chats?: Chats[] | null;
  @ViewChild('swalNewConversation') swalNewConversation?: SwalComponent;

  friends: Observable<AppUser[]> | null = null;

  // endregion

  constructor(private tempUser: TempAppUserService,
              private chatService: ChatsService,
              private route: Router,
              private cd: ChangeDetectorRef) { }

  displaySwal() {
    this.swalNewConversation?.fire().then();

    // get all friends of the connected user
    if(!!this.userConnected)
    {
      this.friends = this.tempUser.getFriends(this.userConnected.friends);
      this.cd.detectChanges();
    }
  }


  createAndGo(friendsClicked: AppUser) {

    // Check if the user have already a chat with the selected user
    let element = this.chats?.find(chats => {
      // search on userID who contains all participant of a chats only if is a private (not a group)
      if(chats.userID.length === 2)
      {
        return chats.userID.find(el => el === friendsClicked.id);
      }
      return null;
    });

    if(!!this.userConnected)
      {
        const newConversation: Chats  = {
          chat: [],
          lastUpdate: Timestamp.now(),
          id: '',
          userID:[this.userConnected.id, friendsClicked.id]
        };

        if(!!element)
        {
          this.route.navigate(['/chat/' + element.id]);
        }
        else
        {
          this.chatService.addChats(newConversation).then(() => {
            if(this.userConnected)
            {
              // push the conversation id on the two chat_is users concerned
              this.userConnected.chats_id.push(newConversation.id);
              friendsClicked.chats_id.push(newConversation.id);

              // update
              this.tempUser.updateUser(this.userConnected).then();
              this.tempUser.updateUser(friendsClicked).then();

              this.route.navigate(['/chat/' + newConversation.id]);
            }
          });
        }
      }


  }
}
