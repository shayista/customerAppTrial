import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { Observable } from 'rxjs/Observable';
 
@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  user: any;
  messages = [];
  nickname = '';
  message = '';
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.nickname = this.navParams.get('nickname');
    this.user = this.navParams.get('userName');
    
    this.getMessages().subscribe(message => {
        this.messages.push(message);
      console.log( this.messages);
    });
    this.getHost().subscribe(data => {
      console.log(data);
      console.log("host");
      let user = data['username'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    this.getUsers().subscribe(data => {
      console.log(data);
      let user = data['username'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });


  }
 
  // sendMessage() {
  //   console.log("sendmessage");
  //   this.socket.emit('add-message', { text: this.message });
  //   this.message = '';
  // }

 sendIndependentMsg() {
   console.log( this.message);
    this.socket.emit("add-user", {username: this.nickname});
    this.socket.emit('new_message', { text: this.message, username: this.nickname });
      this.message = '';
} 

 getMessages() {
    let observable = new Observable(observer => {
      this.socket.on("test_case_changed", function (data){
        console.log(data);
        observer.next(data);
          });

    })
    
    return observable;
  }

  getHost(){
    let observable = new Observable(observable => {
      this.socket.on('host-user', (data) => {
        console.log("host");
        console.log(data);
        observable.next(data);
      });
    });
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
        this.socket.on('add-user', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}