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
import { ChatComponent } from './chat/chat.component';
import { DynamicHubComponent } from './DynamicHub/dynamichub.component';
import { SignalRService } from './services/signalR.service';
import { DynamicHubSignalRService } from './services/dynamicHub.signalR.service';
import { chataComponent } from './chat/chata.component';

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
    EmployeeCreateComponent,
    DynamicHubComponent,
    ChatComponent,
    chataComponent
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
      { path: 'chata', component: chataComponent },
      { path: 'chatter', component: DynamicHubComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'chat/:userid', component: ChatComponent },
      { path: '**', component: FetchDataComponent }
    ])
  ],
  providers: [SignalRService, DynamicHubSignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }

