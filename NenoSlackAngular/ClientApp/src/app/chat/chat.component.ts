import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import { DatePipe } from "@angular/common";
import { chatDetail } from "../Model/chatdetail.model";
import { SignalRService } from '../services/signalR.service';
import { ChatMessage } from "../Model/chatmessage.model";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  //private _hubConnection: HubConnection;
  //public lstEmployee: Employee[];
  ReceiverUserId: number;
  public ReceiverUser: OnlineUser;
  public chatHistory: chatDetail[];
  public datePipe: DatePipe;
  public domain: string;
  public ReceiverId: number;
  public SenderId: number;
  //public msg: string;
  public LoginUser: OnlineUser;
  public cd: chatDetail;
  canSendMessage: boolean;
  UserId: number;

  constructor(private signalrService: SignalRService, private http: HttpClient, private _route: ActivatedRoute, private _ngZone: NgZone) {
    this.subscribeToEvents();
    this.domain = window.location.origin;
    this.cd = new chatDetail();
    http.get<OnlineUser>(this.domain + '/api/UserAPI/GetLoginUser').subscribe(result => {
      if (result == null) {
        window.location.href = "/Login";
      }
      this.LoginUser = result;
    }, error => console.error(error));
  }
  ngOnInit() {

    this._route.params.subscribe(params => {
      this.ReceiverUserId = params['userid'];
      //this.cd.toUserId = this.userId;

      //get receiver information for set detail of receiver
      this.http.get<OnlineUser>(this.domain + '/api/UserAPI/GetOnlineUser/' + this.ReceiverUserId).subscribe(result => {
        //console.log(result);
        this.ReceiverUser = result;
      }, error => console.error(error));

      //get all chat history 
      this.http.get<chatDetail[]>(this.domain + '/api/ChatDetailAPI/GetUserChat/' + this.ReceiverUserId).subscribe(result => {
        console.log(result);
        this.chatHistory = result;
      }, error => console.error(error));
      //this.msg = "";
      this.cd = new chatDetail();
    });
  }
  //for message receiving in this
  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.signalrService.addUserIdInContextId(this.LoginUser.userId, this.LoginUser.userName, this.LoginUser.img);
      this.canSendMessage = true;
    });

    this.signalrService.messageReceived.subscribe((message: chatDetail) => {
      if (this.LoginUser.userId == message.fromUserId || this.LoginUser.userId == message.toUserId) {
        this.cd = new chatDetail();
        message.csscls = (this.LoginUser.userId == message.fromUserId) ? "sent" : "replies";
        this.chatHistory.push(message);
        //var s = document.getElementById("SenderUserId");
      }
    });
  }

  //send message to signalr
  sendMessage() {
    if (this.canSendMessage && this.cd.message) {
      //this.chatMessage.room = this.currentRoom;

      this.cd.fromUserId = this.LoginUser.userId;// Number(document.getElementById("SenderUserId").value);
      this.cd.toUserId = this.ReceiverUserId;// Number(document.getElementById("ReceiverUserId").value);
      //this.cd.csscls = "sent";
      this.cd.IsRead = true;
      //this.cd.message = document.getElementById("messageInput").value;
      //this.cd.createdOn = this.datePipe.transform(new Date(), 'dd/MM HH:mm');
      this.cd.img = this.LoginUser.img;// document.getElementById("SenderImg");
      //this.cd.img = img.value;
      this.signalrService.sendChatDetail(this.cd);
    }
  }
  public AddMessage() {
    //alert(this.datePipe.transform(new Date(), 'dd/MM HH:mm'));
    console.log(this.cd);
    //debugger;
    this.cd = new chatDetail();
    //this.cd = this.chatDetail;

    //this.cd.fromUserId = Number(document.getElementById("SenderUserId").value);
    //this.cd.toUserId = Number(document.getElementById("ReceiverUserId").value);
    //this.cd.csscls = "sent";
    //this.cd.IsRead = true;
    //this.cd.message = document.getElementById("messageInput").value;
    ////this.cd.createdOn = this.datePipe.transform(new Date(), 'dd/MM HH:mm');
    //this.cd.img = document.getElementById("SenderImg").value;
    this.chatHistory.push(this.cd);
  }
}
interface OnlineUser {
  userId: number;
  userName: string;
  connectionIds: string[];
  img: string;
}
