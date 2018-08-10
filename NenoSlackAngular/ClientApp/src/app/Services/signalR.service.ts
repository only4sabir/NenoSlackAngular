import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatMessage } from '../Model/chatmessage.model';
import { chatDetail } from '../Model/chatdetail.model';

@Injectable()
export class SignalRService {
  messageReceived = new EventEmitter<chatDetail>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  //////////////////////////////////
  addUserIdInContextId(userId: number, UserName: string, ImgName: string) {
    this._hubConnection.invoke('ConnectUser', userId, UserName, ImgName);
  }
  sendChatDetail(message: chatDetail) {
    this._hubConnection.invoke('SendMessage', message);
  }
  //////////////////////////////////
  sendChatMessage(message: ChatMessage) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.origin + '/ChatHub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}  
