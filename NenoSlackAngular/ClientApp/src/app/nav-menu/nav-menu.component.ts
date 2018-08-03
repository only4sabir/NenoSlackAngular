import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public users: OnlineUser[];
  public LoginUser: OnlineUser;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(baseUrl);
    http.get<OnlineUser[]>(baseUrl + 'api/UserAPI/GetAllUser').subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => console.error(error));

    http.get<OnlineUser>(baseUrl + 'api/UserAPI/GetLoginUser').subscribe(result => {
      console.log(result);
      this.LoginUser = result;
    }, error => console.error(error));
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
interface OnlineUser {
  userId: number;
  userName: string;
  connectionIds: string[];
  img: string;
}
