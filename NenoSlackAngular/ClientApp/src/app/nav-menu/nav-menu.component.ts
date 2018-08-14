import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { SignalRService } from '../services/signalR.service';
import { OnlineUser } from '../Model/onlineuser.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public users: OnlineUser[];
  public LoginUser: OnlineUser;
  constructor(private signalrService: SignalRService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //console.log(baseUrl);
    http.get<OnlineUser[]>(baseUrl + 'api/UserAPI/GetAllUser').subscribe(result => {
      console.log(result);
      this.users = result;
      this.subscribeToEvents();
    }, error => console.error(error));

    http.get<OnlineUser>(baseUrl + 'api/UserAPI/GetLoginUser').subscribe(result => {
      //console.log('Login  -->');
      //console.log(result);
      if (result == null) {
        window.location.href = "/Login";
      }
      this.LoginUser = result;
      if (this.LoginUser != undefined) {
        this.signalrService.addUserIdInContextId(this.LoginUser.userId, this.LoginUser.userName, this.LoginUser.img);
      }
    }, error => console.error(error));
    console.log('log' + this.users);
  }

  //for message receiving in this
  private subscribeToEvents(): void {
    //console.log('call signalrService.OnlineUserId.subscribe ' + this.signalrService.OnlineUserId);
    this.signalrService.OnlineUserId.subscribe((l: string) => {
      console.log('call signalrService.OnlineUserId.subscribe' + this.signalrService.OnlineUserId);
      if (this.users != null) {
        this.users.forEach(s => s.IsOnline = false);
        //this.users.forEach(e => console.log('filter ' + e));
        this.users.filter(s => l.indexOf(s.userId.toString() + ",") != -1).forEach(e => e.IsOnline = true);
        //console.log('filter ' + this.users.filter(s => l.indexOf(s.userId.toString() + ",") != -1).forEach(e => e.IsOnline = true));
      }
    });
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
//interface OnlineUser {
//  userId: number;
//  userName: string;
//  connectionIds: string[];
//  img: string;
//  countUnread: number;
//}
