import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { StarComponent } from './fetch-data/star.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentCreateComponent } from './department/department.create.component';
import { empty } from 'rxjs/Observer';
import { Employee } from './Model/employee.model';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeCreateComponent } from './employee/employee.create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    StarComponent,
    DepartmentComponent,
    DepartmentCreateComponent,
    EmployeeComponent,
    EmployeeCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'fetch-data1', component: FetchDataComponent },
      { path: 'fetch-department', component: DepartmentComponent },
      { path: 'fetch-department-create/:id', component: DepartmentCreateComponent },
      { path: 'fetch-employee', component: EmployeeComponent },
      { path: 'fetch-employee-create/:id', component: EmployeeCreateComponent },
      { path: '**', component: FetchDataComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
