import { Component, OnInit } from '@angular/core';

import { Forecast } from '../_models/index';
import { ForecastService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    selectedCity: string;
    forecast: Forecast = new Forecast();
    hasResult = false;
    imgfolder = '../../../assets/img/';


    constructor(private forecastService: ForecastService) { }

    onSelect(city: string): void {
        this.selectedCity = city;
    }

    onSendClick(city: string): void {
        this.selectedCity = city;
        this.forecastService.getForecast(city)
            .subscribe(
                result => {
                    this.hasResult = true;
                    this.forecast.city = result['city'];
                    this.forecast.country = result['country'];
                    this.forecast.items = result['forecasts'];
                    console.log(this.forecast);
                },
                err => {
                    console.log('Error- something is wrong!');
                });
    }

    ngOnInit() {

    }
}
