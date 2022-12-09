import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chats } from 'src/app/core/models/chat';
import { ChatsService } from '../../service/chats.service';
import { AuthenticationService } from "../../../../core/service/authentication.service";
import { TempAppUserService } from "../../../../core/service/temp-app-user.service";
import { AppUser } from "../../../../core/models/appUser";
import { Observable } from "rxjs";


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html'
})
export class ChatsComponent implements OnInit {

  // region Attributes

  public chats?: Observable<Chats[]>;
  public userConnected: AppUser | null = new AppUser();

  constructor(private chatService:ChatsService,
              private auth: AuthenticationService,
              private tempUserService: TempAppUserService,
              private cd: ChangeDetectorRef) {

    //if(!this.chats) this.chats = [];
  }

  ngOnInit(): void
  {
    setTimeout(() => {
      this.userConnected = this.auth.userInfo;
      if (!!this.userConnected?.chats_id)
      {
        this.chats =this.chatService.getChatsListByChatId(this.userConnected.chats_id);
        // Detect change update the visual
        this.cd.detectChanges();
      }

    }, 1000);

  }
}
