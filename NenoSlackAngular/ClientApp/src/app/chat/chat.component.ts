import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { $ } from "protractor";
import { DatePipe } from "@angular/common";
//import { Employee } from '../Model/employee.model';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  //private _hubConnection: HubConnection;
  //public lstEmployee: Employee[];
  userId: number;
  public ReceiverUser: OnlineUser;
  public chatHistory: chatDetail[];
  public clnchatHistory: chatDetail[];
  public datePipe: DatePipe;
  public domain: string;
  public ReceiverId: number;
  public SenderId: number;
  public http: HttpClient;
  public msg: string;
  public LoginUser: OnlineUser;
  public cd: chatDetail;

  constructor(chttp: HttpClient, private _route: ActivatedRoute) {
    this.domain = window.location.origin;
    this.http = chttp;
    //console.log(window.location.origin);
    //console.log(this._route.snapshot.paramMap.get("userid"));
    //console.log(baseUrl);
    //this.domain = baseUrl;
    //http.get<OnlineUser[]>(baseUrl + 'api/UserAPI/GetAllUser').subscribe(result => {
    //  console.log(result);
    //  this.user = result;
    //}, error => console.error(error));
    //chttp.get<OnlineUser>(this.domain + 'api/UserAPI/GetLoginUser').subscribe(result => {
    //  console.log(result);
    //  if (result == null) {
    //    window.location.href = "/Login";
    //  }
    //  this.LoginUser = result;
    //}, error => console.error(error));

  }
  ngOnInit() {

    this._route.params.subscribe(params => {
      this.userId = params['userid'];
      this.http.get<OnlineUser>(this.domain + '/api/UserAPI/GetOnlineUser/' + this.userId).subscribe(result => {
        //console.log(result);
        this.ReceiverUser = result;
      }, error => console.error(error));
      this.chatHistory = this.clnchatHistory;
      // $("#messagesList ul li").remove();
      //var myList = document.getElementById('messagesList-ul');
      //myList.innerHTML = '';
      this.http.get<chatDetail[]>(this.domain + '/api/ChatDetailAPI/GetUserChat/' + this.userId).subscribe(result => {
        console.log(result);
        this.chatHistory = result;
      }, error => console.error(error));
      this.msg = "";
      //alert('ioko');
      //var element = document.getElementById("messagesList");
      //element.remove();
      //$("#messagesList ul").html('');
    });
    //console.log(this.domain);
    //console.log(window.location.href.split('/').pop());
    //this.userId = window.location.href.split('/').pop();
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

  //ngOnInit() {
  //  this._route.params.subscribe(params => {
  //    this.userId = params['userid']
  //  });

  //  http.get<OnlineUser[]>(baseUrl + 'api/UserAPI/GetAllUser').subscribe(result => {
  //    console.log(result);
  //    this.user = result;
  //  }, error => console.error(error));
  //}
  //constructor(private http: HttpClient, public router: Router) {

  //}
  //ngOnInit(): void {
  //  this.http.get<Employee[]>('https://localhost:44340/api/EmployeeAPI').subscribe(result => {
  //    this.lstEmployee = result;
  //  }, error => console.error(error))
  //}

  //deleteEmployee(id: string) {
  //  if (confirm("Are you sure you want to Delete?")) {
  //    this.http.delete("https://localhost:44340/api/EmployeeAPI/" + id).
  //      subscribe(data => { alert('Record successfully removed?'); window.location.href = "/fetch-employee"; },
  //        error => { console.log(error); }
  //      );
  //  }
  //}
}
interface OnlineUser {
  userId: number;
  userName: string;
  connectionIds: string[];
  img: string;
}
//chatId":5,"fromUserId":1,"toUserId":3,"message":"dxvxv","createdOn":"2018-08-03T17:36:10.112777","isRead":false,"userId":1,"userDetails":nul
class chatDetail {
  chatId: number;
  fromUserId: number;
  toUserId: number;
  createdOn: string;
  message: string;
  csscls: string;
  IsRead: boolean;
  img: string;
}
