import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { Employee } from '../Model/employee.model';

@Component({
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  public lstEmployee: Employee[];


  constructor(private http: HttpClient, public router: Router) {

  }
  ngOnInit(): void {
    this.http.get<Employee[]>('https://localhost:44340/api/EmployeeAPI').subscribe(result => {
      this.lstEmployee = result;
    }, error => console.error(error))
  }


  deleteEmployee(id: string) {
    if (confirm("Are you sure you want to Delete?")) {
      this.http.delete("https://localhost:44340/api/EmployeeAPI/" + id).
        subscribe(data => { alert('Record successfully removed?'); window.location.href = "/fetch-employee"; },
          error => { console.log(error); }
        );
    }
  }
}

