import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { loginPage } from '../pages/login/login';
import { Socket } from 'ng-socket-io';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './socketio-adapter';
import { Http } from '@angular/http';
import { ComParentChildService} from './com-parent-child.service';
import { commentPage } from '../pages/comments/comments';


@Component({
  selector:'app-component',
  templateUrl: 'app.html'
})
export class MyApp {
 rootPage:any = loginPage;
 loginName : string;
 loginId : string;
 userId = "";
 userCheck : boolean;
 subscription : any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private socket: Socket, private _http: Http,private comparentchildservice: ComParentChildService) {
    this.InitializeSocketListerners();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.show();

    });
  }

  ngOnInit() {
    if(sessionStorage.getItem('attendeeName')) {
      console.log(sessionStorage.getItem('attendeeName'));
      this.loginName  = sessionStorage.getItem('attendeeName');
      this.loginId  = sessionStorage.getItem('attendeeId');
      console.log(this.userId);
      if(this.userId == "") {
        this.InitializeSocketListerners();
        // this.joinRoom(this.loginName,this.loginId);
      } if (sessionStorage.getItem('socketId')) {
        this.joinRoom(this.loginName,this.loginId);
      }
      console.log('sessionStorage.getItem',sessionStorage.getItem('attendeeId'));

    this.subscription = this.comparentchildservice.on('call-parent').subscribe(() => this.endSession());
    }
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  endSession(){
    console.log('end session');
    this.socket.emit("disconnect", this.userId);
    this.socket.emit("logout",this.userId);
    this.userCheck = false;
  }

  public adapter: ChatAdapter;

  public joinRoom(username,userId): void 
  {
    this.socket.emit("join", username , userId);
    // console.log(userId);
  }

  public InitializeSocketListerners(): void
  {
    console.log('app Component',this.userId);
    let userId = this.userId;
    this.socket.on("generatedUserId", (userId) => {
      console.log('userId generatedUserId',userId);
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this._http);
      this.userId = userId;
      this.userCheck = true;  
      sessionStorage.setItem('socketId',this.userId);
    });
  }

  closeChat() {
    document.getElementById('instantChat').setAttribute("style", "display:none");
  }
}

