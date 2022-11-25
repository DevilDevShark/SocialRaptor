import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../service/chats.service';
import { Chat, Chats } from 'src/app/core/models/chat';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chats: Chats = new Chats;
  private routeSub?: Subscription;
  public messageCtrl = new FormControl();

  constructor(private chatService:ChatsService,private route: ActivatedRoute) { 
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
    const message = this.messageCtrl.value;
    const a: Chat   = { 
      fromTo: (Math.floor(1000 * Math.random()))+"wololo"+(Math.floor(1000 * Math.random())),
      time: Timestamp.now(),
      message: message
    };
    this.chats?.chat.push(a);
    this.chatService.updateChats(this.chats)

  }

}
