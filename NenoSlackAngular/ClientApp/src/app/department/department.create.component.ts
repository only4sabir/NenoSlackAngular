import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Department } from "../Model/department.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { debug, isUndefined } from "util";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  //selector: 'app-departmentCreate-component',
  templateUrl: './department.create.component.html',
})


export class DepartmentCreateComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private http: HttpClient) {
    console.log(this._route.snapshot.paramMap.get("id"));
  }
  public department: Department;
  public btnName: string = "Add";
  ngOnInit() {
    var Deptid = this._route.snapshot.paramMap.get("id");
    //console.log(Deptid);
    if (Deptid != '0') {
      this.http.get<Department>('https://localhost:44340/API/' + Deptid).subscribe(result => {
        this.department = result;
      }, error => console.error(error));
      this.btnName = "Update";
    }
    else {
      this.department = new Department(0, '');
      //console.log(this.department);
      this.btnName = "Add";
    }
    //console.log(this.btnName);
  }
  create() {
    //if (checkValidation()) {
      //debugger;
      if (this.department.departmentId == 0) {
        //console.log(this.department.departmentId);
        this.http.post<Department>("https://localhost:44340/API/", this.department).subscribe(data => { alert('Department successfully added'); window.location.href = "/fetch-department"; },
          error => { alert(error); }
        );
      }
      else {
        //console.log(this.department.departmentId);
        this.http.put<Department>("https://localhost:44340/API/" + this.department.departmentId, this.department).subscribe(data => { alert('Department successfully udpated'); window.location.href = "/fetch-department"; },
          error => { alert(error); }
        );
      }
    //}
  }

  //create1() {

  //  //console.log(this.department);
  //  //{
  //  //  departmentId: 13, name: "Junior developer"
  //  //}
  //  const postedData = { departmentId: this.department.DepartmentId, name: this.department.Name };
  //  return this.http.post('https://localhost:44340/API/', postedData, httpOptions).subscribe(result => {
  //    console.log(result);
  //  }, error => console.log('There was an error: sas'));
  //}
  //create2() {
  //  debugger;
  //  //const params = new HttpParams();
  //  //if (this.department.DepartmentId > 0) {
  //  //  params.append('DepartmentId', this.department.DepartmentId.toString());
  //  //}
  //  //params.append('Name', 'Developer12');
  //  //const params = { departmentId: this.department.DepartmentId, name: this.department.Name };
  //  const params = { Name: "Senior developer1" };
  //  //var queryHeaders = new HttpHeaders();
  //  //queryHeaders.append('Content-Type', 'application/json');
  //  console.log("https://localhost:44340/API/PostDepartment/" + params);
  //  var v = this.http.post("https://localhost:44340/API/PostDepartment/",
  //    params
  //  ).subscribe(data => { alert('ok'); },
  //    error => { alert("Error"); }
  //  );

  //}


  //ngOnInit(): void {

  //  console.log(this._route.snapshot.paramMap.get("id"));
  //}

}
