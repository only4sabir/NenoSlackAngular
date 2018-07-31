import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  /* template: `this i s a test version by {{name}}<input type="text" id="txt"/>`,*/
  templateUrl: './home.component.html',
})
export class HomeComponent {
  name: string = "sabir shaikh";
  product: any[] = [
    {
      "name": "s",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }, {
      "name": "s1",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }, {
      "name": "s2",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }, {
      "name": "s3",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }, {
      "name": "s5",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }, {
      "name": "s",
      "name1": "s",
      "name2": "s",
      "name3": "s"
    }];

}
