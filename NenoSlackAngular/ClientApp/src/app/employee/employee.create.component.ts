import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Employee } from "../Model/employee.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { debug, isUndefined } from "util";
import { Department } from "../Model/department.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  //selector: 'app-employeeCreate-component',
  templateUrl: './employee.create.component.html',
})


export class EmployeeCreateComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private http: HttpClient) {
    console.log(this._route.snapshot.paramMap.get("id"));
  }
  public employee: Employee;
  public btnName: string = "Add";
  public lstDepartment: Department[];
  ngOnInit() {
    var Deptid = this._route.snapshot.paramMap.get("id");
    if (Deptid != '0') {
      this.http.get<Employee>('https://localhost:44340/api/EmployeeAPI/' + Deptid).subscribe(result => {
        this.employee = result;
      }, error => console.error(error));
      this.btnName = "Update";
    }
    else {
      this.employee = new Employee(0, '', '', '', '');
      this.btnName = "Add";
    }

    //get department list

    this.http.get<Department[]>('https://localhost:44340/API').subscribe(result => {
      this.lstDepartment = result;
    }, error => console.error(error));
  }
  create() {
    //if (checkValidation()) {
      if (this.employee.employeeId == 0) {
        this.http.post<Employee>("https://localhost:44340/api/EmployeeAPI/", this.employee).subscribe(data => { alert('employee successfully added'); window.location.href = "/fetch-employee"; },
          error => { alert(error); }
        );
      }
      else {
        this.http.put<Employee>("https://localhost:44340/api/EmployeeAPI/" + this.employee.employeeId, this.employee).subscribe(data => { alert('employee successfully udpated'); window.location.href = "/fetch-employee"; },
          error => { alert(error); }
        );
      }
    //}
  }

}
