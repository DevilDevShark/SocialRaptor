import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../service/chats.service';
import { Chat, Chats } from 'src/app/core/models/chat';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import {AuthenticationService} from "../../../../core/service/authentication.service";


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chats: Chats = new Chats;
  private routeSub?: Subscription;
  public messageCtrl = new FormControl();

  constructor(private chatService:ChatsService,
              private auth: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      
      this.chatService.getChatById(params['id']).subscribe( data => {
        this.chats = data[0];
      });
    });
  }

  sendMessage() {
    if(!!this.auth.userInfo)
    {
      const newMessage: Chat   = {
        fromTo:   this.auth.userInfo.userName,
        time:     Timestamp.now(),
        message:  this.messageCtrl.value,
        isRead:   false
      };

      this.chats?.chat.push(newMessage);
      this.chatService.updateChats(this.chats);
    }


  }

}
