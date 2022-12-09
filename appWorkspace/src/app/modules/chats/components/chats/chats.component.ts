import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Chat, Chats } from 'src/app/core/models/chat';
import { ChatsService } from '../../service/chats.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html'
})
export class ChatsComponent implements OnInit {
  public chats?: Chats[];


  constructor(private chatService:ChatsService) {

    if(!this.chats) this.chats = [];
  }

  ngOnInit(): void
  {



    this.chatService.getAllChats().subscribe((data:Chats[]) => this.chats = data)


  }

  inutile() {}

  createChatId() {
    const a: Chat   = {
      isRead:false,
      fromTo: (Math.floor(1000 * Math.random()))+"wololo"+(Math.floor(1000 * Math.random())),
      time: Timestamp.now(),
      message: "wololo :" + (Math.floor(1000 * Math.random()))+"wololo"+(Math.floor(1000 * Math.random()))
    };

    const b: Chats  = {
        chat: [a, a, a, a],
        lastUpdate: Timestamp.now(),
        id: '',
        userID:[]
    };

    this.chatService.addChats(b);
  }



}
