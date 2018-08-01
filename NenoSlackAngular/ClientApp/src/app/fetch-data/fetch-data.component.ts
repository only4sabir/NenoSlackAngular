import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  btnStaus: boolean = false;

  toggleImage(): void { this.btnStaus = !this.btnStaus }
}

interface WeatherForecast {
  img: string;
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
