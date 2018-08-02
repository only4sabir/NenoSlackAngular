import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
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
  domain: string;
  ReceiverId: number;
  SenderId: number;
  http: HttpClient;
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
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this.userId = params['userid'];
      this.http.get<OnlineUser>(this.domain + '/api/UserAPI/GetOnlineUser/' + this.userId).subscribe(result => {
        console.log(result);
        this.ReceiverUser = result;
      }, error => console.error(error));
    });
    console.log(this.domain);
    console.log(window.location.href.split('/').pop());
    //this.userId = window.location.href.split('/').pop();
    

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

  send() {

  }
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
