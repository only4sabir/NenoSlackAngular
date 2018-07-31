import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Options } from 'selenium-webdriver/ie';
//import { Observable } from 'rxjs/Observable';
import { Department } from '../Model/department.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-department-component',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  public lstDepartment: Department[];

  //constructor(http: HttpClient) {
  //  http.get<Department[]>('https://localhost:44340/API', options).subscribe(result => {
  //    this.lstDepartment1 = result;
  //  }, error => console.error(error));
  //}
  constructor(private http: HttpClient, public router: Router) {
    //this.http.get<Department[]>('https://localhost:44340/API').subscribe(result => {
    //  this.lstDepartment1 = result;
    //}, error => console.error(error))
  }
  ngOnInit(): void {
    this.http.get<Department[]>('https://localhost:44340/API').subscribe(result => {
      this.lstDepartment = result;
    }, error => console.error(error))
  }


  deleteDepartment(id: string) {
    if (confirm("Are you sure you want to Delete?")) {
      this.http.delete("https://localhost:44340/API/" + id).
        subscribe(data => { alert('Record successfully removed?');  window.location.href = "/fetch-department"; },
        error => { console.log(error); }
      );
    }
  }
}
//interface Department {
//  departmentId: number;
//  name: string;
//  employees: employee;
//}
//interface employee {
//  EmployeeId: number;
//  Name: string;
//  Address: string;
//  Mobile: string;
//}

