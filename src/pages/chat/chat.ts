import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
//import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { mainHeader } from '../mainHeader/mainHeader';
import * as io from 'socket.io-client';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  nickname:" ";
  user: String;
  names=[];
    constructor(public navCtrl: NavController,private socket: Socket, private navParams: NavParams) {
    
      this.user = this.navParams.get('user');
      this.names = this.navParams.get('attendees');
      
    }
  
    
    joinChat(x) {
        console.log(this.names[x]);
     
      this.socket.connect();
      console.log("1");
      this.socket.emit('host', {"username": this.user});
      console.log("2");
      this.navCtrl.push('ChatroomPage', { nickname: this.names[x],userName:this.user });
    }

  
}
